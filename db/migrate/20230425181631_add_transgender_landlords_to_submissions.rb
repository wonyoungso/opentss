class AddTransgenderLandlordsToSubmissions < ActiveRecord::Migration[7.0]
  def change
    add_column :submissions, :transgender, :text
    add_column :submissions, :landlord_scale, :text
  end
end
