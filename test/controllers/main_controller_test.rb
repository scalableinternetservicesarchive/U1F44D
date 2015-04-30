require 'test_helper'

# Main controller is the entry point for our application,
# and responsible for ensuring that the base HTML and JS
# we need to run this page are served.
class MainControllerTest < ActionController::TestCase
  # When the index is loaded, we should have a session cookie and create new user
  test "should set the session cookie on the index" do
    original_user_count = User.count
    get :index
    assert_response :success # Sanity check
    assert_not_nil cookies['snapyak_sid']
    assert_not_equal original_user_count, User.count
  end

  # @todo use selenium to make sure that cookie/localstorage cyling works
end
