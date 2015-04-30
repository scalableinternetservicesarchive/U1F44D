require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "column sid exists" do
    assert ActiveRecord::Base.connection.column_exists?(:users, :sid)
  end

  test "column karma exists" do
    assert ActiveRecord::Base.connection.column_exists?(:users, :karma)
  end

  test "column sid uniquness" do
    assert User.create(sid: "87654")

    assert_raises ActiveRecord::RecordNotUnique do
      User.create(sid: "87654")
    end
  end
end
