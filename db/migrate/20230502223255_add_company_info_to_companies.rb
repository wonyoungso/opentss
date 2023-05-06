class AddCompanyInfoToCompanies < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :company_address, :string
    add_column :companies, :company_city, :string
    add_column :companies, :company_state, :string
    add_column :companies, :company_zip_code, :string
  end
end
