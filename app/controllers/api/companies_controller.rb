class Api::CompaniesController < ApplicationController
  include Rails.application.routes.url_helpers
  include ActiveStorage::SetCurrent
  def index
    if params[:mode] == "full"
      @companies = Company.load_full_list
      @sampled_companies = @companies.shuffle[0, 10]

      render json: { companies: @companies, sampled_companies: @sampled_companies }
    else
      @companies = Company.load_full_list
      render json: @companies
    end

  end

  def how_tss_works
    @companies = Company.where.not(fees: nil).where.not(company_type: 'nationwide CRA').select(:id, :name, :eviction_data_fields, :criminal_data_fields, :fees)
    @companies = @companies.shuffle[0, 12]

    render json: @companies
  end


  def show
    @company = Company.find params[:id]
    @descriptions = @company.descriptions.where(desc_type: "company").map {|d| d.conv_to_json }

    render json: { company: @company.conv_to_json_comp, descriptions: @descriptions }

  end

  def request_copy
    @company = Company.select(:id, :name, :is_accept_letter, :request_copy_url, :form_json, :custom_letter_required, 
      :company_address,
      :company_city,
      :company_state,
      :company_zip_code,
      :company_mail_name,
      :outsourcing_company_id,
    ).find(params[:id])
    @descriptions = @company.descriptions.where(desc_type: "request copy").map {|d| d.conv_to_json }

    @result = { 
      company: @company.conv_to_json,   
      descriptions: @descriptions 
    }

      @result[:outsourcing_companies] = @company.outsourcing_companies.map {|cc| cc.conv_to_json }
      @result[:outsourcing_company_descriptions] = @company.outsourcing_companies.map {|cc| 
        cc.descriptions.where(desc_type: "request copy").map {|d| d.conv_to_json }
         
      }
      
      
    render json: @result
  end
end
