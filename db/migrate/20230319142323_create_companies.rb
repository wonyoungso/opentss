class CreateCompanies < ActiveRecord::Migration[7.0]
  def change
    create_table :companies do |t|
      t.string :name
      t.string :url
      t.boolean :is_accept_letter

      t.timestamps
    end
  end
end
