class Api::CompaniesController < ApplicationController
  def index
    @companies = Company.select(:id, :name).order("name ASC")

    render json: @companies
  end
end
