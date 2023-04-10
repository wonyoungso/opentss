Rails.application.routes.draw do
  devise_for :users
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  namespace :api do 
    get "/confirm-email/:token", to: "confirm_email#confirm", as: "confirm_email"
    resources :submissions do 
      collection do 
        post "query_email"
        get "/retrieve_result/:token", to: "submissions#retrieve_result", as: "retrieve_result"
      end

    end

    resources :companies do 
      member do
        get "request-copy"
      end
    end
  end

  resources :companies


  get "/confirm-email/:token", to: "welcome#confirm_email", as: "confirm_email"

  get "/submissions/retrieve", to: "submissions#retrieve", as: "submissions_retrieve"
  get "/retrieve-submission/:token", to: "submissions#retrieve_result", as: "retrieve_result"


  get "/submissions", to: "submissions#index", as: "submissions"
  get "/submissions/new", to: "submissions#new", as: "submissions_new"

  get "/how-tss-works", to: "welcome#how_tss_works", as: "how-tss-works"
  get "/request-copy", to: "welcome#request_copy", as: "request-copy-get"
  get "/request-copy/new", to: "welcome#request_copy_new", as: "request-copy-new"
  get "/request-copy/:type/:arg", to: "welcome#request_result", as: "request-copy-result"
  get "/about", to: "welcome#about", as: "about"

  get "/admin_home", to: "welcome#admin_home", as: "admin_home"
  root "welcome#index"
  
end
