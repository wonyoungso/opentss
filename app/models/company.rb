class Company < ApplicationRecord
  include Rails.application.routes.url_helpers
  include ApplicationHelper

  has_many :companies_descriptions
  has_many :descriptions, :through => :companies_descriptions
  has_many :submissions

  belongs_to :outsourcing_company, class_name: "Company", :optional => true

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

  def self.load_full_list
    Company.includes(:outsourcing_company).order("name ASC").map { |c|
      result = {
        id: c.id,
        name: c.name,
        data_collection: c.data_collection,
        scoring_system: c.scoring_system,
        is_sample_report_avail: c.is_sample_report_avail,
        submissions_cnt: c.submissions.count,
        outsourcing_company: nil
      }

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

