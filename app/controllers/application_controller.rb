class ApplicationController < ActionController::Base
  around_action :switch_locale
  def not_rails_admin
    @not_rails_admin = true
  end


  def switch_locale(&action)
    @og_description = "OpenTSS aims to develop a crowdsourcing tool and/or campaign to audit tenant screening services and reveal the patterns of their inner algorithms, data structures, and representations, by collecting tenant screening reports, as well as denied renters’ experiences."

    begin
      if I18n.available_locales.include?(params[:locale].to_sym)
        @locale = params[:locale]
      else
        @locale = I18n.default_locale
      end
    rescue
      @locale = I18n.default_locale
    end
    
    I18n.with_locale(@locale, &action)
  
  end
end
