class AddEvictionCriminalDataFieldsToCompanies < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :eviction_data_fields, :json
    add_column :companies, :criminal_data_fields, :json
  end
end

a = Company.find 10
edf = a.eviction_data_fields
cdf = a.criminal_data_fields


Company.find_each do |c|
  c.criminal_data_fields = cdf
  c.eviction_data_fields = edf
  c.save
end  

