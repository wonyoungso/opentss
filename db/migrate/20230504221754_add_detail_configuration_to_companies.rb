class AddDetailConfigurationToCompanies < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :detail_config, :json
  end
end
