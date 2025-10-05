class MovimentacoesController < ApplicationController
  def index
    movimentacoes = Movimentacao.all
    render json: movimentacoes
  end

  def create
    movimentacao = Movimentacao.new(movimentacao_params)

    if movimentacao.save
      render json: movimentacao, status: :created
    else
      render json: { errors: movimentacao.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def movimentacao_params
    params.require(:movimentacao).permit(
      :tipo_operacao,
      :correntista_id,
      :valor_operacao,
      :data_operacao,
      :descricao,
      :correntista_beneficiario_id
    )
  end
end
