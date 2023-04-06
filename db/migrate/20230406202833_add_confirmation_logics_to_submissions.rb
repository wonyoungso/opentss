class AddConfirmationLogicsToSubmissions < ActiveRecord::Migration[7.0]
  def change
    add_column :submissions, :confirmation_token, :string
    add_column :submissions, :confirmation_sent_at, :datetime
    add_column :submissions, :confirmed, :boolean, :default => false
    add_column :submissions, :confirmed_at, :datetime
    add_column :submissions, :retrieve_token, :string
    add_column :submissions, :retrieve_sent_at, :datetime
  end
end
