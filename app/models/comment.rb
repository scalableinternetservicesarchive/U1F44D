class Comment < ActiveRecord::Base
  belongs_to :image
  belongs_to :user

  def as_json(options = {})
    super(except: [:user_id])
  end
end
