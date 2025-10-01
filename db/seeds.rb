Movimentacao.create!(
  tipo_operacao: "C",
  correntista_id: 1,
  valor_operacao: 1500.00,
  data_operacao: Time.now,
  descricao: "Depósito inicial"
)

Movimentacao.create!(
  tipo_operacao: "D",
  correntista_id: 1,
  valor_operacao: 200.00,
  data_operacao: Time.now,
  descricao: "Pagamento de conta"
)

Movimentacao.create!(
  tipo_operacao: "D",
  correntista_id: 1,
  valor_operacao: 300.00,
  data_operacao: Time.now,
  descricao: "Transferência",
  correntista_beneficiario_id: 2
)
