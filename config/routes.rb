Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  namespace :api do 
    resources :submissions
    resources :companies do 
      member do
        get "request-copy"
      end
    end
  end

  resources :companies

  get "/submissions/retrieve", to: "submissions#retrieve", as: "submissions_retrieve"
  get "/submissions", to: "submissions#index", as: "submissions"
  get "/submissions/new", to: "submissions#new", as: "submissions_new"

  get "/how-tss-works", to: "welcome#how_tss_works", as: "how-tss-works"
  get "/request-copy", to: "welcome#request_copy", as: "request-copy-get"
  get "/request-copy/new", to: "welcome#request_copy_new", as: "request-copy-new"
  get "/request-copy/:type/:arg", to: "welcome#request_result", as: "request-copy-result"
  get "/about", to: "welcome#about", as: "about"

  root "welcome#index"
  
end
