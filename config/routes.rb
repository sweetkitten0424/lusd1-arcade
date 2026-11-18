Rails.application.routes.draw do
  namespace :api do
    post "register", to: "auth#register"
    post "login", to: "auth#login"
    resources :games, only: [:index, :show], param: :slug
    resources :scores, only: [:create]
  end
end

