class AddColumnsToCompanies < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :data_collection, :text
    add_column :companies, :scoring_system, :text
    add_column :companies, :outsourcing_company_id, :integer
  end
end
