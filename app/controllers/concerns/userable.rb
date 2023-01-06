module Userable
  extend ActiveSupport::Concern

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def password_params
    params.require(:user).permit(:password, :password_confirmation)
  end
end
