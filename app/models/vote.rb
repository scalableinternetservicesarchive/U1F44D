class Vote < ActiveRecord::Base
  self.table_name = "votes"

  belongs_to :user
  belongs_to :image

  def downvote?
    !upvote?
  end

  def downvote=(down_bool)
    upvote = !down_bool
  end
end