class AddStatusToSubmissions < ActiveRecord::Migration[7.0]
  def change
    add_column :submissions, :status, :string, :default => "submitted"
  end
end
