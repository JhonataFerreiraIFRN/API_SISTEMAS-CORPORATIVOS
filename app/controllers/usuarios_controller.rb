class UsuariosController < ApplicationController
  include Authenticable

  def index
    usuarios = Usuario.all
    render json: usuarios
  end

  def create
    usuario = Usuario.new(usuario_params)
    if usuario.save
      render json: usuario, status: :created
    else
      render json: { errors: usuario.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def usuario_params
    params.require(:usuario).permit(:nome, :email, :password)
  end
end
  