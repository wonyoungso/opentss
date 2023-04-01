class AddRequestFormFieldJsonToCompanies < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :form_json, :json
  end
end
