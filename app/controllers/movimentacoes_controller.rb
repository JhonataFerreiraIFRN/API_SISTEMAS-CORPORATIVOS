class MovimentacoesController < ApplicationController
  def index
    movimentacoes = Movimentacao.all
    render json: movimentacoes
  end
end
