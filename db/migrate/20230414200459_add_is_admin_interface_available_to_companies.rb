class AddIsAdminInterfaceAvailableToCompanies < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :is_admin_interface_available, :boolean, :default => false
  end
end
