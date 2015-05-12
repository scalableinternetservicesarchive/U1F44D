class Image < ActiveRecord::Base
  has_attached_file :img,
                    :storage => :s3,
                    :bucket => ENV['S3_BUCKET_NAME'],
                    :s3_credentials => {
                        :access_key_id => ENV['AWS_ACCESS_KEY_ID'],
                        :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY']
                    },
                    :url => ":s3_domain_url",
                    :s3_endpoint => 's3-us-west-2.amazonaws.com',
                    :path => '/:filename',
                    :s3_host_name => 's3-us-west-2.amazonaws.com'

  validates_attachment_content_type :img, :content_type => /\Aimage\/.*\Z/

  has_many :votes
  has_many :comments

  def url
    # @TODO use the right URL...
    #this function needs to be changed to return the s3 url
    # return "/images/view/" + read_attribute(:id).to_s
    return "/images/view/" + read_attribute(:id).to_s
  end
end
