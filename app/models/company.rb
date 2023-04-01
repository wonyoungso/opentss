class Company < ApplicationRecord
  include Rails.application.routes.url_helpers
  include ApplicationHelper

  has_many :companies_descriptions
  has_many :descriptions, :through => :companies_descriptions

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

end
