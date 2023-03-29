class CompaniesController < ApplicationController
  def index
    @title = "Tenant Screening Services Lookup Tool | OpenTSS: Countering Tenant Screening"
    render layout: 'application', template: 'welcome/index'
  end
end
