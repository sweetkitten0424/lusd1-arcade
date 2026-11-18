class Api::AuthController < ApplicationController
  def register
    user = User.new(user_params)
    if user.save
      token = JWT.encode({ user_id: user.id }, JWT_SECRET, "HS256")
      render json: { token: token, username: user.username }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      token = JWT.encode({ user_id: user.id }, JWT_SECRET, "HS256")
      render json: { token: token, username: user.username }, status: :ok
    else
      render json: { error: "Invalid username or password" }, status: :unauthorized
    end
  end

  private

  def user_params
    params.permit(:username, :email, :password)
  end
end
