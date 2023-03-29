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

  def about
    @title = "About This Project | OpenTSS: Countering Tenant Screening"
    render layout: 'application', template: "welcome/index"
  end
end
