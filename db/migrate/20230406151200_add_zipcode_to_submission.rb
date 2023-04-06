class AddZipcodeToSubmission < ActiveRecord::Migration[7.0]
  def change
    add_column :submissions, :property_address_zipcode, :text
  end
end
