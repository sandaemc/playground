Rails.application.routes.draw do
  resources :articles
  resources :users, param: :_username
  post '/auth/login', to: 'authentication#login'
end
