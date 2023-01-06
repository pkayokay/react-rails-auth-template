class UserMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.reset_password.subject
  #
  def confirm_email
    @token = params[:user].signed_id(expires_in: 1.day, purpose: "confirm_email")

    mail to: params[:user].email
  end

  def reset_password
    @token = params[:user].signed_id(expires_in: 15.minutes, purpose: "reset_password")

    mail to: params[:user].email
  end
end

# https://www.youtube.com/watch?v=JMXGExhr0C4
# - signed_id
# - to_global_id
