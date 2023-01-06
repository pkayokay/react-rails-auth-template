class BaseController < ApplicationController
  def index
  end

  def app
    # Redirects should match up what is defined in <AuthRoute />.
    # Authenticated
    if Current.user
      return redirect_to app_path if Current.user.confirmed_at.present? && confirm_email_path.in?(request.path)
      return redirect_to app_path if reset_password_path(token: "").in?(request.path)
      redirect_to app_path if [sign_up_path, sign_in_path, forgot_password_path].include? request.path
    # Public
    elsif [app_path, account_path].include? request.path
      redirect_to sign_in_path
    end
  end
end
