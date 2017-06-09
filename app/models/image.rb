class Image < ApplicationRecord
  include ImageUploader[:file]
  belongs_to :object, polymorphic: true

  alias_attribute :title, :alt
  validates_presence_of :alt
end
