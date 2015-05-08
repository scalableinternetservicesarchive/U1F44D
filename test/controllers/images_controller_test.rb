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

    # Let's make sure the result matches our database too
    img = Image.find( JSON.parse( @response.body )[ 'id' ] )
    assert img.url == JSON.parse( @response.body )[ 'url' ]
  end

  test "should show that you haven't upvoted an image" do
    image = Image.last
    post :upvoted?, {id: image.id}

    assert_equal false, JSON.parse(@response.body)['upvoted']
  end

  test "image can be upvoted" do
    image = Image.last
    og_vote_count = image.votes.count
    og_image_score = image.score
    post :upvote, {id: image.id}

    assert_response 200
    image.reload
    assert_equal og_vote_count+1, image.votes.count
    assert_equal og_image_score+1, image.score
    assert image.votes.to_a.last.upvote?
  end

  test "should show that you have upvoted an image" do
    image = Image.last
    user = User.first
    cookies[:snapyak_sid] = user.sid
    vote = Vote.new
    vote.image = image
    vote.user = user
    vote.upvote = true
    vote.save!
    post :upvoted?, {id: image.id}

    assert_equal true, JSON.parse(@response.body)['upvoted']
  end

  test "should show that you haven't downvoted an image" do
    image = Image.last
    post :downvoted?, {id: image.id}

    assert_equal false, JSON.parse(@response.body)['downvoted']
  end

  test "image can be downvoted" do
    image = Image.last
    og_vote_count = image.votes.count
    og_image_score = image.score
    post :downvote, {id: image.id}

    assert_response 200
    image.reload
    assert_equal og_vote_count-1, image.votes.count
    assert_equal og_image_score-1, image.score
    assert image.votes.to_a.last.downvote?
  end

  test "should show that you have downvoted an image" do
    image = Image.last
    user = User.first
    cookies[:snapyak_sid] = user.sid
    vote = Vote.new
    vote.image = image
    vote.user = user
    vote.downvote = true
    vote.save!
    post :downvoted?, {id: image.id}

    assert_equal true, JSON.parse(@response.body)['downvoted']
  end
end
