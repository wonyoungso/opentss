class CompaniesController < ApplicationController
  def index
    @title = "Tenant Screening Services Lookup Tool | OpenTSS: Countering Tenant Screening"
    render layout: 'application', template: 'welcome/index'
  end

  def show
    @company = Company.select(:name).find(params[:id])
    @title = "#{@company.name} :: Tenant Screening Services Lookup Tool | OpenTSS: Countering Tenant Screening"
    render layout: 'application', template: 'welcome/index'
  end
end
