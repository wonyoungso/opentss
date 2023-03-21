class Company < ApplicationRecord
  has_many :companies_descriptions
  has_many :descriptions, :through => :companies_descriptions
end
