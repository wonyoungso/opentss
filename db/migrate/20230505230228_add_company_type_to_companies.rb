class AddCompanyTypeToCompanies < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :company_type, :string, :default => "nationwide specialty CRA"
  end
end
