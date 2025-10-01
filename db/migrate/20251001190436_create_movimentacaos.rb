class CreateMovimentacaos < ActiveRecord::Migration[7.1]
  def change
    create_table :movimentacaos do |t|
      t.string  :tipo_operacao, limit: 1, null: false
      t.integer :correntista_id, null: false
      t.decimal :valor_operacao, precision: 10, scale: 2, null: false
      t.datetime :data_operacao, null: false
      t.string  :descricao, limit: 50, null: false
      t.integer :correntista_beneficiario_id

      t.timestamps
    end
  end
end
