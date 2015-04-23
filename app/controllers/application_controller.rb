class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # Before every request, let's check if the session ID
  # cookie is set--if it isn't we'll go ahead and do so.
  before_action :set_session_cookie
  protected

  def set_session_cookie
    if (!cookies[:snapyak_sid])
      # We aren't using securerandom here as it's slower, and overkill for our
      # application. The chance of collisions is low here, and since it's
      # an anonymous application anyway...
      cookies[:snapyak_sid] = (0...50).map { ('a'..'z').to_a[rand(26)] }.join
    end
  end
end
