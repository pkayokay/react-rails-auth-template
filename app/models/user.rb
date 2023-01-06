class User < ApplicationRecord
  has_secure_password

  validates :email, uniqueness: true, presence: true, format: {with: URI::MailTo::EMAIL_REGEXP, message: "invalid email address"}

  before_validation :normalize_email

  def normalize_email
    self.email = email.strip
  end

  def is_confirmed?
    confirmed_at.present? && created_at.after?(1.day.ago)
  end
end
