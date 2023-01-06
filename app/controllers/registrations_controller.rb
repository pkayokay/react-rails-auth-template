class RegistrationsController < ApplicationController
  include Userable

  def create
    user = User.new(user_params)
    if user.save
      email_token(user: user)
      session[:user_id] = user.id
      render json: {email: user.email}, status: :ok
    else
      render json: {errors: user.errors.full_messages.join(", ")}, status: :unprocessable_entity
    end
  end

  def confirm_email
    user = User.find_signed!(params[:token], purpose: "confirm_email")
    user.update!(confirmed_at: Time.now)
    render json: {success: "Email confirmed."}, status: :ok
  rescue ActiveSupport::MessageVerifier::InvalidSignature
    render json: {errors: "Your token has expired. Please try again."}, status: :unauthorized
  end

  def send_confirmation_token
    user = User.find_by(email: params[:email].strip)
    email_token(user: user) if user.present?

    render json: {success: "If an account with that email is found, we have sent a link to confirm the email."}, status: :ok
  end

  private

  def email_token(user:)
    UserMailer.with(user: user).confirm_email.deliver_later
  end
end
