class ApplicationController < ActionController::Base
  around_action :switch_locale
  def not_rails_admin
    @not_rails_admin = true
  end


  def switch_locale(&action)
    locale = params[:locale] || I18n.default_locale
    I18n.with_locale(locale, &action)
  end
end
