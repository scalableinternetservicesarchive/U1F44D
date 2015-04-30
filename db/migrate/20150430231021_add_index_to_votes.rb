class AddIndexToVotes < ActiveRecord::Migration
  def change
    add_index :votes, [:image_id, :user_id], unique: true
  end
end
