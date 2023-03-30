class Api::CompaniesController < ApplicationController
  def index
    @companies = Company.select(:id, :name).order("name ASC")

    render json: @companies
  end


  def request_copy
    @company = Company.select(:id, :name, :is_accept_letter, :request_copy_url).find(params[:id])
    @descriptions = @company.descriptions.where(desc_type: "request copy").map {|d| d.conv_to_json }

    render json: { company: @company, descriptions: @descriptions }
  end
end
