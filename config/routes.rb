Rails.application.routes.draw do
  resources :movimentacoes, only: [:index, :create]
end
