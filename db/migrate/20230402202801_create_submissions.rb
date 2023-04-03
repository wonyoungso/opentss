class CreateSubmissions < ActiveRecord::Migration[7.0]
  def change
    create_table :submissions do |t|
      t.boolean :consented
      t.datetime :consented_at

      t.timestamps
    end
  end
end
