class PasswordsController < ApplicationController
  include Userable

  before_action :require_user_logged_in!, only: [:update]

  def update
    user = Current.user
    if user.update(password_params)
      render json: {success: "Password updated"}, status: :ok
    else
      render json: {errors: user.errors.full_messages.join(", ")}, status: :unprocessable_entity
    end
  end

  def reset
    user = User.find_signed!(params[:token], purpose: "reset_password")
    if user.update(password_params)
      render json: {success: "Password updated. Please sign in with your new password"}, status: :ok
    else
      render json: {errors: user.errors.full_messages.join(", ")}, status: :unprocessable_entity
    end
  end

  def verify_token
    User.find_signed!(params[:token], purpose: "reset_password")
    render json: {success: "Token is valid."}, status: :ok
  rescue ActiveSupport::MessageVerifier::InvalidSignature
    render json: {errors: "Your token has expired. Please try again."}, status: :unauthorized
  end

  def send_reset_token
    user = User.find_by(email: params[:email].strip)

    if user.present?
      UserMailer.with(user: user).reset_password.deliver_later
    end

    render json: {success: "If an account with that email is found, we have sent a link to reset your password."}, status: :ok
  end
end
