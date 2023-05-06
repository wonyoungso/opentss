class CreateOutsourcings < ActiveRecord::Migration[7.0]
  def change
    create_table :outsourcings do |t|
      t.integer :company_id
      t.integer :outsourcing_company_id

      t.timestamps
    end
  end
end
