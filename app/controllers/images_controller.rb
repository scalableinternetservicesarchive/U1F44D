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
    images = Image.where( "location_lat >= :lat_lower AND location_lat <= :lat_upper AND location_long >= :long_lower AND location_long <= :long_upper AND score > -5", location_bounds ).order( created_at: :desc ).limit(50)
    render :json => to_json_safe_fields( images.all )

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

  private

  # A helper to ensure that only the fields we want output are output
  def to_json_safe_fields( img )
    img.to_json( :except => [ :img_file_name, :img_content_type, :img_file_size, :img_updated_at, :updated_at ], :methods => :url ) 
  end
end
