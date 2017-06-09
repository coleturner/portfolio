require 'digest/md5'

class User < ApplicationRecord
  include AvatarUploader[:avatar]
  extend FriendlyId
  friendly_id :name, use: :slugged

  # Other modules:  :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable


  def gravatar
    "http://www.gravatar.com/avatar/#{Digest::MD5.hexdigest(email.downcase)}"
  end

  def role?(test)
    return true
  end

end
