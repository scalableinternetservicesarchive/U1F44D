class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :url
      t.integer :score
      t.float :location_lat
      t.float :location_long
      t.string :author

      t.timestamps null: false
    end
  end
end
