class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  include Rails.application.routes.url_helpers


  def self.find_sluggable(slug, models)
    models.each do |type|
      found =
        if type.respond_to? :friendly
          type.friendly.find(slug) rescue nil
        else
          type.find_by_slug(slug)
        end

      return found if found.present?
    end

    nil
  end
end
