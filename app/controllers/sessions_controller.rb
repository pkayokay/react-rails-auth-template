class SessionsController < ApplicationController
  include Userable

  before_action :require_user_logged_in!, only: [:destroy]

  def create
    user = User.find_by(email: user_params[:email].strip)
    if user&.authenticate(user_params[:password])
      session[:user_id] = user.id
      render json: {email: user.email}, status: :ok
    else
      render json: {errors: "Invalid email or password"}, status: :unauthorized
    end
  end

  def destroy
    session[:user_id] = nil
  end

  def me
    response = Current.user ? {email: Current.user.email, isConfirmed: Current.user.is_confirmed?} : {}
    render json: response, status: :ok
  end
end
