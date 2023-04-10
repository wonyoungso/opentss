class WelcomeController < ApplicationController
  def index
    @title = "OpenTSS: Countering Tenant Screening"
    render layout: 'application', template: "welcome/index"
  end
  
  def how_tss_works
    @title = "How Tenant Screening Service Works | OpenTSS: Countering Tenant Screening"
    render layout: 'application', template: "welcome/index"
  end

  def request_copy
    @title = "Request a Copy of Tenant Screening Report | OpenTSS: Countering Tenant Screening"
    render layout: 'application', template: "welcome/index"
  end

  def request_copy_new
    @title = "Request a Copy of Tenant Screening Report | OpenTSS: Countering Tenant Screening"
    render layout: 'application', template: "welcome/index"
  end

  def request_result
    @title = "Request a Copy of Tenant Screening Report | OpenTSS: Countering Tenant Screening"
    render layout: 'application', template: "welcome/index"
  end

  def about
    @title = "About This Project | OpenTSS: Countering Tenant Screening"
    render layout: 'application', template: "welcome/index"
  end

  def confirm_email
    @title = "Confirm your email | OpenTSS: Countering Tenant Screening"
    render layout: 'application', template: "welcome/index"

  end



  def admin_home
    render layout: 'admin_home'
  end
end
