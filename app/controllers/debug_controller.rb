class DebugController < ApplicationController
  def session
    # Since the layout probably won't work well here, go ahead and hide it.
    @cookie_sid_value = cookies[:snapyak_sid]
    render :layout => false
    return
  end
end
