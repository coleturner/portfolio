class Viewer
  def initialize(user)
    @user = user
  end

  attr_accessor :user
  delegate :avatar, :role?, *User.attribute_names, to: :user, allow_nil: true

end
