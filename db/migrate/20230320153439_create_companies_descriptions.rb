class CreateCompaniesDescriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :companies_descriptions do |t|
      t.integer :company_id
      t.integer :description_id
      t.timestamps
    end
  end
end
