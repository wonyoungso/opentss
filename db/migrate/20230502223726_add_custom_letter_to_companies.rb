class AddCustomLetterToCompanies < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :custom_letter_required, :boolean, :default => false
  end
end
