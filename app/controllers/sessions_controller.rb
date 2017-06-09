class SessionsController < Devise::SessionsController

  def create
    params[:user].merge!(remember_me: 1)
    super
  end

end
