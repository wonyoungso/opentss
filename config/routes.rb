require "ipaddr"
class WhiteList
  def initialize
    @ip_ranges = [
                   {
                     start_ip: '18.0.0.0',
                     end_ip:   '18.31.255.255'
                   }
                 ]
  end

  def matches?(request)

    return true if Rails.env.development? 
    remote_ip_address = IPAddr.new(request.remote_ip).to_i

    @ip_ranges.each do |ip_range|
      low  = IPAddr.new(ip_range[:start_ip]).to_i
      high = IPAddr.new(ip_range[:end_ip]).to_i
      return true if (low..high)===remote_ip_address
    end

    return false
  end

end
Rails.application.routes.draw do
  constraints WhiteList.new do
    devise_for :users
    mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  end

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


  scope "/:locale", locale: /en|es/ do
      
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
  get '/*path', to: redirect("/#{I18n.default_locale}/%{path}"),
    constraints: lambda { |req| req.path.exclude? 'rails/active_storage' and req.path.exclude? 'admin' }
end
