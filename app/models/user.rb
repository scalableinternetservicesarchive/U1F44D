class User < ActiveRecord::Base
  attr_accessible :sid, :karma

  has_many :votes
end
