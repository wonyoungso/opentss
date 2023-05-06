class AddCompanyMailNameToCompanies < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :company_mail_name, :string

    Company.all.find_each do |c|
      c.company_mail_name = c.name
      c.save
    end
  end
end
