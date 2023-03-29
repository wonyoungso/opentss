class SubmissionsController < ApplicationController
  def index
    @title = "Retrieve Your Submission | OpenTSS: Countering Tenant Screening"
    render layout: 'application', template: 'welcome/index'
  end

  def new
    @title = "Submit Your Tenant Screening Report | OpenTSS: Countering Tenant Screening"
    render layout: 'application', template: 'welcome/index'
  end
end