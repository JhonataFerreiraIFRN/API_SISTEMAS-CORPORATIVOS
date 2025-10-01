Rails.application.routes.draw do
  resources :movimentacoes, only: [:index]
end
