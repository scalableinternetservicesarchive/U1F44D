class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :url
      t.integer :score
      t.float :lat
      t.float :long
      t.string :author

      t.timestamps null: false
    end
  end
end
