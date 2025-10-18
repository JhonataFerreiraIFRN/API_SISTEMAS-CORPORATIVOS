Rails.application.routes.draw do
  post "/login", to: "auth#login"

  resources :usuarios, only: [:index, :create]
  resources :movimentacoes, only: [:index, :create]
end
