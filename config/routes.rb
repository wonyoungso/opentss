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
        get "/retrieve_result/:token/reupload_report", to: "submissions#reupload_report", as: "retrieve_reupload_report"
        get "/retrieve_result/:token/consent_form", to: "submissions#consent_form", as: "consent_form"
        post "/retrieve_result/:token/reupload_report_submit", to: "submissions#reupload_report_submit", as: "retrieve_reupload_report_submit"
      end

    end

    resources :companies do 
      member do
        get "request-copy"
      end
      collection do 
        get "how_tss_works"
      end
    end
  end


  scope "/:locale" do
      
    resources :companies
    
    get "/confirm-email/:token", to: "welcome#confirm_email", as: "confirm_email"

    get "/submissions/retrieve", to: "submissions#retrieve", as: "submissions_retrieve"
    get "/retrieve-submission/:token", to: "submissions#retrieve_result", as: "retrieve_result"
    get "/retrieve-submission/:token/reupload_report", to: "submissions#reupload_report", as: "retrieve_reupload_report"
    get "/retrieve-submission/:token/consent_form", to: "submissions#consent_form", as: "retrieve_consent_form"

    get "/submissions", to: "submissions#index", as: "submissions"
    get "/submissions/new", to: "submissions#new", as: "submissions_new"

    get "/how-tss-works", to: "welcome#how_tss_works", as: "how-tss-works"
    get "/request-copy", to: "welcome#request_copy", as: "request-copy-get"
    get "/request-copy/new", to: "welcome#request_copy_new", as: "request-copy-new"
    get "/request-copy/custom-form/:company_name", to: "welcome#request_result", as: "request-copy-custom"
    get "/request-copy/:type/:arg", to: "welcome#request_result", as: "request-copy-result"

    get "/about", to: "welcome#about", as: "about"

    get "/admin_home", to: "welcome#admin_home", as: "admin_home"
    get "/", to: "welcome#index", as: "welcome"
    
  end
  

  root to: redirect("/#{I18n.default_locale}", status: 302), as: :root

end
