class PermissionError < StandardError
  attr_accessor :errors

  def initialize(error='You do not have the permission required to perform this action.')
    super
  end
end
