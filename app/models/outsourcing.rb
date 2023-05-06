class Outsourcing < ApplicationRecord
  belongs_to :company, class_name: "Company"
  belongs_to :outsourcing_company, class_name: "Company"

  validates :company_id, :presence => true
  validates :outsourcing_company_id, presence: true, uniqueness: {scope: [:company_id]}
end
