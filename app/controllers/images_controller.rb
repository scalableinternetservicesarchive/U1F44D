class ImagesController < ApplicationController
  skip_before_filter :verify_authenticity_token # No way for our AJAX clients to grab this

  # 5 miles is about .072 degrees for lat and long around UCLA's location
  @@FIVE_MILES = 0.072

  # GET /images?lat=&long=
  #
  # Fetch the top 50 images around a specified geographic location, sorted by post date.
  # Excludes images ranked below -5.
  # @TODO use a better sorting algorithm that takes score into account, too.
  def index
    # Default to 0,0 for location if the parameters aren't set...
    lat = params[:lat] ? params[:lat].to_f : 0
    long = params[:long] ? params[:long].to_f : 0

    # We want to search within a 5 mile box (which gives us about a 7 mile radius)
    location_bounds = {
      lat_lower: lat - @@FIVE_MILES,
      lat_upper: lat + @@FIVE_MILES,
      long_lower: long - @@FIVE_MILES,
      long_upper: long + @@FIVE_MILES
    }

    images = []
    Image.order( created_at: :desc ).all.each do |img|
      # Make sure we get each image within the bounds...
      if ( img[:location_lat] < location_bounds[:lat_lower] ||
          img[:location_long] < location_bounds[:long_lower] ||
          img[:location_lat] > location_bounds[:lat_upper] ||
          img[:location_long] > location_bounds[:long_upper] ||
          img[:score] < -5 )
        next
      end

      images.push( img )
    end
    render :json => to_json_safe_fields( images.slice( 0, 50 ) )

  end

  # POST /images
  #
  # Upload a new image.
  def upload
    user_sid = cookies[:snapyak_sid]
    image = Image.new

    # Set the image parameters...
    # @TODO validate
    image.score = 0
    image.location_lat = params[:lat].to_f
    image.location_long = params[:long].to_f
    image.author = user_sid # @TODO username?
    image.img = params[:image]
    image.save
    render status:200, :json => to_json_safe_fields( image )
  end

  # POST /images/image_id/up
  #
  # Upvote an image
  def upvote
    user = User.find_by_sid cookies[:snapyak_sid]
    image = Image.find params[:id]
    # @TODO make sure these resources exist
    vote = image.votes.find_by_user_id user.id
    if !vote
      vote = Vote.new
      vote.user = user
      vote.image = image
      vote.upvote = true
      image.score += 1 if vote.save
      image.save
    elsif vote.downvote?
      vote.upvote = true
      vote.score += 2 if vote.save
      image.save
    end

    render status: 200, nothing: true
  end

  def upvoted?
    user = User.find_by_sid cookies[:snapyak_sid]
    image = Image.find params[:id]
    # @TODO make sure these resources exist
    vote = image.votes.find_by_user_id user.id
    has_upvote = false
    has_upvote = true if vote && vote.upvote?

    render status: 200, json: {upvoted: has_upvote}
  end

  # POST /images/image_id/down
  #
  # Downvote an image
  def downvote
    user = User.find_by_sid cookies[:snapyak_sid]
    image = Image.find params[:id]
    # @TODO make sure these resources exist
    vote = image.votes.find_by_user_id user.id
    if !vote
      vote = Vote.new
      vote.user = user
      vote.image = image
      vote.downvote = true
      image.score -= 1 if vote.save
      image.save
    elsif vote.upvote?
      vote.downvote = true
      vote.score -= 2 if vote.save
      image.save
    end

    render status: 200, nothing: true
  end

  def downvoted?
    user = User.find_by_sid cookies[:snapyak_sid]
    image = Image.find params[:id]
    # @TODO make sure these resources exist
    vote = image.votes.find_by_user_id user.id
    has_downvote = false
    has_downvote = true if vote && vote.downvote?

    render status: 200, json: {downvoted: has_downvote}
  end

  def comments
    comments = []
    Comment.all.each do |c|
      if ( c[:image_id].to_i != params[:id].to_i )
        next
      end
      comments.push( c )
    end
    render status: 200, json: comments
  end

  def add_comment
    user = User.find_by_sid cookies[:snapyak_sid]
    image = Image.find params[:id]
    text = params[:text]

    comment = Comment.new
    comment.text = text
    comment.user = user
    comment.image = image
    comment.save

    render status: 200, json: comment
  end

  private

  # A helper to ensure that only the fields we want output are output
  def to_json_safe_fields( img )
    img.to_json( :except => [ :img_file_name, :img_content_type, :img_file_size, :img_updated_at, :updated_at ], :methods => :url ) 
  end
end
