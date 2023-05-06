class AddAkaToCompanies < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :aka, :string
  end
end
