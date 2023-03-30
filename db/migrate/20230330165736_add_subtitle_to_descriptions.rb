class AddSubtitleToDescriptions < ActiveRecord::Migration[7.0]
  def change
    add_column :descriptions, :subtitle, :string
  end
end
