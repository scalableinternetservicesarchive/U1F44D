class CreateJoinTable < ActiveRecord::Migration
  def change
    create_join_table :user, :images, table_name: :votes do |t|
      t.boolean :upvote
    end
  end
end
