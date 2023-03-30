class AddRequestCopyUrlToCompanies < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :request_copy_url, :string
  end
end
