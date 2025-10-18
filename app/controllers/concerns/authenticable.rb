module Authenticable
  extend ActiveSupport::Concern
  require "jwt"

  included do
    before_action :authorize_request
  end

  private

  def authorize_request
    header = request.headers["Authorization"]

    if header.present?
      token = header.split(" ").last
      begin
        decoded = JWT.decode(token, Rails.application.secret_key_base, true, algorithm: "HS256")
        @current_user = Usuario.find(decoded[0]["user_id"])
      rescue JWT::DecodeError
        render json: { error: "Token inválido" }, status: :unauthorized
      end
    else
      render json: { error: "Token ausente" }, status: :unauthorized
    end
  end
end
