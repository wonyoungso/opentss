class ApplicationController < ActionController::Base
  def not_rails_admin
    @not_rails_admin = true
  end
end
