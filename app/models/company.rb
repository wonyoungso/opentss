class Company < ApplicationRecord
  include Rails.application.routes.url_helpers
  include ApplicationHelper

  has_many :companies_descriptions
  has_many :descriptions, :through => :companies_descriptions
  has_many :submissions

  belongs_to :outsourcing_company, class_name: "Company", :optional => true
  has_many :resellers, class_name: "Company", foreign_key: "outsourcing_company_id"

  has_one_attached :request_form

  def conv_to_json
    {
      id: self.id,
      name: self.name,
      is_accept_letter: self.is_accept_letter,
      request_copy_url: self.request_copy_url,
      form_json: self.form_json.present? ? self.form_json : nil,
      request_form_url: self.request_form.present? ? url_for(self.request_form) : nil,
    }
  end

  def conv_to_json_concise 
    {
      id: self.id,
      name: self.name
    }
  end


  def conv_to_json_comp
    result = {
      id: self.id,
      name: self.name,
      data_collection: self.data_collection,
      scoring_system: self.scoring_system,
      is_sample_report_avail: self.is_sample_report_avail,
      submissions_cnt: self.submissions.count,
      outsourcing_company: nil,
      is_admin_interface_available: self.is_admin_interface_available,
      resellers: self.resellers.map {|reseller| reseller.conv_to_json_concise }
    }

    if self.outsourcing_company_id.present?
      result[:outsourcing_company] = {
        id: self.outsourcing_company.id,
        name: self.outsourcing_company.name
      }

      result[:submissions_cnt] = self.outsourcing_company.submissions.count
    end

    result
  end


  def self.load_full_list
    Company.includes(:outsourcing_company).order("name ASC").map { |c|
      result = c.conv_to_json_comp

      if c.outsourcing_company_id.present?
        result[:outsourcing_company] = {
          id: c.outsourcing_company.id,
          name: c.outsourcing_company.name
        }

        result[:submissions_cnt] = c.outsourcing_company.submissions.count
      end
      
      result
    } 
  end


end

