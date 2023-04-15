class CreateReportStatistics < ActiveRecord::Migration[7.0]
  def change
    create_table :report_statistics do |t|
      t.integer :company_id

      t.integer :total
      t.integer :accepted_cnt
      t.integer :denied_cnt
      t.float   :avg_security_deposit
      t.json    :landlord_scale
      t.json    :credit_score_dist
      t.json    :rti_dist
      t.json    :monthly_debt_dist
      
      t.timestamps
    end
  end
end
