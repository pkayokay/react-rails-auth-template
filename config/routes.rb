Rails.application.routes.draw do
  root "base#index"

  scope "app" do
    # Authenticated
    get "", to: "base#app", as: :app
    get "account", to: "base#app"
    # Public
    get "sign_up", to: "base#app"
    get "sign_in", to: "base#app"
    get "forgot_password", to: "base#app"
    get "reset_password/:token", to: "base#app", as: :reset_password
    # Either public or private, redirect to app if already confirmed
    get "confirm_email", to: "base#app", as: :confirm_email
  end

  # Registrations
  post "sign_up", to: "registrations#create"
  post "confirm_email", to: "registrations#confirm_email"
  post "send_confirmation_token", to: "registrations#send_confirmation_token"

  # Sessions
  post "sign_in", to: "sessions#create"
  delete "logout", to: "sessions#destroy"
  get "me", to: "sessions#me"

  # Passwords
  patch "update_password", to: "passwords#update"
  post "verify_password_reset_token", to: "passwords#verify_token"
  patch "reset_password", to: "passwords#reset"
  post "send_password_reset", to: "passwords#send_reset_token"
end
