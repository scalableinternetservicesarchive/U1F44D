require 'test_helper'

# Main controller is the entry point for our application,
# and responsible for ensuring that the base HTML and JS
# we need to run this page are served.
class MainControllerTest < ActionController::TestCase
  # When the index is loaded, we should have a session cookie
  test "should set the session cookie on the index" do
    get :index
    assert_response :success # Sanity check
    assert_not_nil cookies['snapyak_sid']
  end

  # @todo use selenium to make sure that cookie/localstorage cyling works
end
