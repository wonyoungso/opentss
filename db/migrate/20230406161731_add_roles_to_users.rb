class AddRolesToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :superadmin_role, :boolean
  end
end
