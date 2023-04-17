class AddFeesToCompanies < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :fees, :json
  end
end
