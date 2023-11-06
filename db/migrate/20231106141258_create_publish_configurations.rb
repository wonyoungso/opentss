class CreatePublishConfigurations < ActiveRecord::Migration[7.0]
  def change
    create_table :publish_configurations do |t|
      t.boolean :publish_survey

      t.timestamps
    end
  end
end
