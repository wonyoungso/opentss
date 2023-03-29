Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  namespace :api do 
    resources :companies
  end

  resources :companies
  resources :submissions

  get "/how-tss-works", to: "welcome#how_tss_works", as: "how-tss-works"
  get "/request-copy", to: "welcome#request_copy", as: "request-copy"
  get "/request-copy/new", to: "welcome#request_copy_new", as: "request-copy-new"
  get "/about", to: "welcome#about", as: "about"

  root "welcome#index"
  
end
