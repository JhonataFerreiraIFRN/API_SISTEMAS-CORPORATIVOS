class ApplicationController < ActionController::API
  def authenticate_request
    header = request.headers['Authorization']
    token = header.split(' ').last if header
    decoded = JsonWebToken.decode(token)
    @current_user = Usuario.find(decoded[:user_id])
  rescue ActiveRecord::RecordNotFound, JWT::DecodeError
    render json: { errors: 'Acesso não autorizado' }, status: :unauthorized
  end
end
