require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "valid user" do
    user = User.new(email: "new@test.com", password: "123456")
    assert user.valid?
  end

  test "should not save without email" do
    user = User.new(password: "123456")
    assert_not user.valid?
  end

  test "should not save when using existing email" do
    existing_user = users(:one)
    user = User.new(email: existing_user.email, password: "123456")
    assert_not user.valid?
  end
end
