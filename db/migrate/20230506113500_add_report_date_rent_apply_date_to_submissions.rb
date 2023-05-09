class AddReportDateRentApplyDateToSubmissions < ActiveRecord::Migration[7.0]
  def change
    add_column :submissions, :report_date_month, :text
    add_column :submissions, :report_date_year, :text
    add_column :submissions, :rent_apply_date_month, :text
    add_column :submissions, :rent_apply_date_year, :text
  end
end
