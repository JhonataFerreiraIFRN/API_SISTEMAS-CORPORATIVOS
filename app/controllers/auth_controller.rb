class AuthController < ApplicationController
  require "jwt"

  SECRET_KEY = Rails.application.secret_key_base

  # POST /login
  def login
    user = Usuario.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      token = JWT.encode({ user_id: user.id }, SECRET_KEY, "HS256")
      render json: { token: token }, status: :ok
    else
      render json: { error: "Email ou senha inválidos" }, status: :unauthorized
    end
  end
end
