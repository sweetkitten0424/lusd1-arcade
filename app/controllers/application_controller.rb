class ApplicationController < ActionController::API
  JWT_SECRET = Rails.application.secret_key_base

  private

  def authenticate_user!
    header = request.headers["Authorization"]
    token = header.split(" ").last if header.present?

    decoded = JWT.decode(token, JWT_SECRET, true, algorithm: "HS256").first
    @current_user = User.find(decoded["user_id"])
  rescue JWT::DecodeError, ActiveRecord::RecordNotFound
    render json: { error: "Unauthorized" }, status: :unauthorized
  end

  attr_reader :current_user
end

