class CreateDescriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :descriptions do |t|
      t.string :title
      t.string :desc_type

      t.timestamps
    end
  end
end
