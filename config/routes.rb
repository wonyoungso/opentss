Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  namespace :api do 
    resources :companies
  end

  get '/tss-companies', to: 'welcome#index', as: 'tss-comapnies'
  get '/tss-companies/:id', to: 'welcome#index', as: 'tss-company'

  root "welcome#index"
  
end
