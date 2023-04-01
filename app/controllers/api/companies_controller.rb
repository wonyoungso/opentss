class Api::CompaniesController < ApplicationController
  include Rails.application.routes.url_helpers
  include ActiveStorage::SetCurrent
  def index
    @companies = Company.select(:id, :name).order("name ASC")

    render json: @companies
  end


  def request_copy
    @company = Company.select(:id, :name, :is_accept_letter, :request_copy_url, :form_json).find(params[:id])
    @descriptions = @company.descriptions.where(desc_type: "request copy").map {|d| d.conv_to_json }

    render json: { company: @company.conv_to_json, descriptions: @descriptions }
  end
end
