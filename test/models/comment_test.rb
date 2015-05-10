require 'test_helper'
require 'json'

class CommentTest < ActiveSupport::TestCase
  test "comment belongs to user" do
    comment = Comment.first
    assert comment.user
  end

  test "comment belongs to image" do
    comment = Comment.first
    assert comment.image
  end

  test "comment json shouldn't have userid" do
    comment = Comment.first
    assert_nil JSON.parse(comment.as_json.to_json)['user_id']
  end
end
