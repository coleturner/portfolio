class Content < ApplicationRecord
  belongs_to :object, polymorphic: true
  enum status: { draft: 0, published: 1 }

  validates_presence_of :object
  validates_associated :object

  delegate :title, to: :object

  def status
    super.to_sym
  end
end
