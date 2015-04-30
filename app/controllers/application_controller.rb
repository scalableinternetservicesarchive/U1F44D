class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # Before every request, let's check if the session ID
  # cookie is set--if it isn't we'll go ahead and do so.
  before_action :set_session_cookie
  protected

  def set_session_cookie
    if !cookies[:snapyak_sid]
      new_sid = ""
      loop do
        new_sid = (0...50).map { ('a'..'z').to_a[rand(26)] }.join
        break if !User.find_by_sid(new_sid)
      end
      User.create(sid: new_sid)
      cookies[:snapyak_sid] = new_sid
    end

    if !User.find_by_sid cookies[:snapyak_sid]
      User.create!(sid: cookies[:snapyak_sid])
    end
  end
end
