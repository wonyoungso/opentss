class AddRewardGrantedAtToSubmissions < ActiveRecord::Migration[7.0]
  def change
    add_column :submissions, :reward_granted_at, :datetime
    add_column :submissions, :reward_tremendous_json, :json
  end
end
