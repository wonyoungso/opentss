class Description < ApplicationRecord
  has_rich_text :content

  has_many :companies_descriptions
  has_many :companies, :through => :companies_descriptions
end
