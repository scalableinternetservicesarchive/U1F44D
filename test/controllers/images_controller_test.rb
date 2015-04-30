require 'test_helper'
require 'json'

class ImagesControllerTest < ActionController::TestCase
  test "should list images within specified latitude and longitude" do
    get :index, { lat: 34.0722, long: 118.4441 }
    assert JSON.parse( @response.body ).length > 1
  end

  test "should not list images outside the specified latitude and longitude" do
    get :index, { lat: 9999, long: 9999 }
    assert JSON.parse( @response.body ).length == 0
  end

  test "should not list images below the score threshold" do
    get :index, { lat: 120, long: 120 }
    assert JSON.parse( @response.body ).length == 0
  end

  test "should list images with the most recent first" do
    get :index, { lat: 34.0722, long: 118.4441 }
    images = JSON.parse @response.body
    assert images[0][ 'created_at' ] >= images[1][ 'created_at' ]
  end

  test "should allow you to create an image" do
    test_image = "test/fixtures/test_image.jpg"
    file = Rack::Test::UploadedFile.new(test_image, "image/jpeg")
    post :upload, { image: file, lat: 100, long: 100 }
    # For success, let's see if we got a URL back
    assert JSON.parse( @response.body )[ 'url' ].length != 0
  end
end
