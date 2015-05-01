class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :sid, null: false
      t.integer :karma, null: false, default: 0

      t.timestamps null: false
    end
    add_index :users, :sid, unique: true
  end
end
