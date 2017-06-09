class Functions::FindRecord < GraphQL::Function
  attr_reader :type

  def initialize(model_class:, type:)
    @model_class = model_class
    @type = type
  end

  argument :id, !GraphQL::ID_TYPE

  def call(obj, args, ctx)
    @model_class.find(args[:id])
  end
end
