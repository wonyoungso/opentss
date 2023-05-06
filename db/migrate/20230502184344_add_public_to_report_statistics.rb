class AddPublicToReportStatistics < ActiveRecord::Migration[7.0]
  def change
    add_column :report_statistics, :public, :boolean, :default => false
  end
end
