module Eventable
  def self.included(base)
    base.extend ClassMethods
    base.has_many :events
  end

  module ClassMethods
    def create_event(type, **etc)
      Event.new(object: self, type: type, **etc)
    end

    def find_or_make_event(type, date: Date.today)
      exists = Event.where(type: type, date: date)
      if exists.present?
        exists
      else
        create_event(type, date: date)
      end
    end

    def track_event!(type)
      found = find_or_make_event(type)
      found.value += 1
      found.save
      found
    end
  end
end
