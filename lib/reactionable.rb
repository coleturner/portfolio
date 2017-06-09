module Reactionable
  def self.included(base)
    base.extend ClassMethods
  end

  module ClassMethods
    @reaction_values = :any

    def reactions(values = :any)
      if reflect_on_association(:reaction_links).nil?
        has_many :reaction_groups, as: :object
        has_many :reactions, through: :reaction_groups
      end

      @reaction_values = values
    end

    def reaction_valid?(value)
      return true if @reaction_values == :any
      @reaction_values.include?(value) || @reaction_values.include?(value.to_sym)
    end
  end

end
