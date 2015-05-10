class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.references :image, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true
      t.text :text

      t.timestamps null: false
    end
  end
end
