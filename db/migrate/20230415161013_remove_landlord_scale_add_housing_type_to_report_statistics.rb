class RemoveLandlordScaleAddHousingTypeToReportStatistics < ActiveRecord::Migration[7.0]
  def change
    remove_column :report_statistics, :landlord_scale
    add_column :report_statistics, :housing_type, :json
  end
end
