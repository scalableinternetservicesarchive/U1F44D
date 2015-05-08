class Image < ActiveRecord::Base
  has_attached_file :img
  validates_attachment_content_type :img, :content_type => /\Aimage\/.*\Z/

  has_many :votes

  def url
    # @TODO use the right URL...
    return "/images/view/" + read_attribute(:id).to_s
  end
end
