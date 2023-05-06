class Company < ApplicationRecord
  include Rails.application.routes.url_helpers
  include ApplicationHelper

  has_many :companies_descriptions
  has_many :descriptions, :through => :companies_descriptions
  has_many :submissions
  has_one  :report_statistic

  before_create :init_data

  has_one_attached :request_form

  has_many :outsourcing_links, class_name: "Outsourcing", foreign_key: 'company_id', dependent: :destroy
  has_many :outsourcing_companies, :through => :outsourcing_links, :source => :outsourcing_company

  has_many :reselling_links, class_name: "Outsourcing", foreign_key: 'outsourcing_company_id', dependent: :destroy
  has_many :reselling_companies, :through => :reselling_links, :source => :company


  belongs_to :outsourcing_company, class_name: "Company", :optional => true
  has_many :resellers, class_name: "Company", foreign_key: "outsourcing_company_id"

  enum company_type: {
    nationwide_specialty_CRA: 'nationwide specialty CRA', 
    nationwide_CRA: 'nationwide CRA',
    management_company: 'management company' 
  }
  

  def init_data
    self.data_collection = "Credit Score,Credit History,Employment History,Eviction History, Criminal History"
    self.fees = {
      "fees" => [
        { "name" => "Basic", "amount" => 20 }
      ],                                
      "notes" => "Can charge fees to applicants."
    }
  end

  def conv_to_json
    {
      id: self.id,
      name: self.name,
      is_accept_letter: self.is_accept_letter,
      request_copy_url: self.request_copy_url,
      form_json: self.form_json.present? ? self.form_json : nil,
      request_form_url: self.request_form.present? ? url_for(self.request_form) : nil,
      custom_letter_required: self.custom_letter_required,
      company_mail_name: self.company_mail_name,
      company_address: self.company_address,
      company_city: self.company_city,
      company_state: self.company_state,
      company_zip_code: self.company_zip_code
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
      resellers: self.resellers.map {|reseller| reseller.conv_to_json_concise },
      eviction_data_fields: self.eviction_data_fields,
      criminal_data_fields: self.criminal_data_fields,
      report_statistic: nil,
      custom_letter_required: self.custom_letter_required
    }

    if self.outsourcing_companies.count > 0
      result[:outsourcing_companies] = self.outsourcing_companies.map {|cc| 
        {
          id: cc.id,
          name: cc.name,
          count: cc.submissions.count
        }
      }

      result[:submissions_cnt] = result[:outsourcing_companies].sum {|cc| cc[:count] }
    else
      if self.report_statistic.present? and 
         self.report_statistic.public 
        result[:report_statistic] = self.report_statistic.conv_to_json
      end
    end

    result
  end


  def conv_to_json_list
    {
      id: self.id,
      name: self.name,
      data_collection: self.data_collection,
      scoring_system: self.scoring_system,
      submissions_cnt: self.submissions.count
    }
  end


  def self.load_full_list
    Company.where.not(company_type: 'nationwide CRA').order("name ASC").map { |c|
      result = c.conv_to_json_list

      if c.outsourcing_companies.count > 0
        result[:outsourcing_companies] = c.outsourcing_companies.map {|cc| 
          {
            id: cc.id,
            name: cc.name,
            count: cc.submissions.count
          }
        }

        result[:submissions_cnt] = result[:outsourcing_companies].sum {|cc| cc[:count] }
      end
      result
    } 
  end


end

