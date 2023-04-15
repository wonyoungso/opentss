class AddDtiDistToReportStatistics < ActiveRecord::Migration[7.0]
  def change
    add_column :report_statistics, :dti_dist, :json
  end
end
