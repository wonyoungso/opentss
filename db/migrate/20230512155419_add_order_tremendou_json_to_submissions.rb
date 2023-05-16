class AddOrderTremendouJsonToSubmissions < ActiveRecord::Migration[7.0]
  def change
    add_column :submissions, :order_tremendous_json, :json
  end
end
