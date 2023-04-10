class AddIsSampleReportAvailToCompanies < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :is_sample_report_avail, :boolean, :default => false
  end
end
