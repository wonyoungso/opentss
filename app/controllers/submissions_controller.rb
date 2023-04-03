class SubmissionsController < ApplicationController
  def retrieve
    @title = "Retrieve Your Submission | OpenTSS: Countering Tenant Screening"
    render layout: 'application', template: 'welcome/index'
  end

  def index
    @title = "Submit Your Tenant Screening Report | OpenTSS: Countering Tenant Screening"
    render layout: 'application', template: 'welcome/index'
  end
  
  def new
    @title = "Submit Your Tenant Screening Report | OpenTSS: Countering Tenant Screening"
    render layout: 'application', template: 'welcome/index'
  end

  def consent
    @title = "Submit Your Tenant Screening Report :: Informed Consent | OpenTSS: Countering Tenant Screening"
    render layout: 'application', template: 'welcome/index'  
  end

end