class AddFieldsToSubmissions < ActiveRecord::Migration[7.0]
  def change
    add_column :submissions, :printed_name, :text
    add_column :submissions, :gender, :text
    add_column :submissions, :is_hispanic_or_latino, :text
    add_column :submissions, :race, :text
    add_column :submissions, :age, :text
    add_column :submissions, :partner, :text
    add_column :submissions, :dependents, :text
    add_column :submissions, :income, :text
    add_column :submissions, :accepted, :text
    add_column :submissions, :security_deposit, :text
    add_column :submissions, :rent, :text
    add_column :submissions, :bedrooms, :text
    add_column :submissions, :house_type, :text
    add_column :submissions, :voucher, :text
    add_column :submissions, :minimum_rent, :text
    add_column :submissions, :landlord_name, :text
    add_column :submissions, :property_address, :text
    add_column :submissions, :property_address_city, :text
    add_column :submissions, :property_address_state, :text
    add_column :submissions, :experience_freeform, :text
    add_column :submissions, :interview_possible, :text
    add_column :submissions, :email, :text
  end
end
