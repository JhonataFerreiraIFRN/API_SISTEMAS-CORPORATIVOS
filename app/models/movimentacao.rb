class Movimentacao < ApplicationRecord
 #não da pra ficar mais simples que isso mas basicamente: P: Pagamento, T: Transferência S: Saque, D: Depósito
  VALID_OPERATION_TYPES = %w[P T S D].freeze

  validates :tipo_operacao, presence: true, inclusion: { in: VALID_OPERATION_TYPES }
  validates :correntista_id, presence: true
  validates :valor_operacao, presence: true, numericality: { greater_than: 0 }
  validates :data_operacao, presence: true
  validates :descricao, presence: true, length: { maximum: 50 }
end
