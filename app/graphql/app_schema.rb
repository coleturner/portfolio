
GraphQL::Field.accepts_definitions(recline_appearance: GraphQL::Define.assign_metadata_key(:recline_appearance))


AppSchema = GraphQL::Schema.define do
  query(Types::QueryType)
  mutation(Types::MutationType)
  instrument(:field, FieldTimerInstrument.new)
  instrument(:field, CamelCaseInstrument.new)

  orphan_types [
    Types::ActivityType, Types::ArticleType, Types::AssetType,
    Types::CollectionType, Types::FeedType, Types::UserType, Types::CurrentUserType
  ]

  # Return a string UUID for `object`
  id_from_object ->(object, type_definition, query_ctx) {
    raise ArgumentError, "Object #{object} does not respond to method #id" unless object.respond_to? :id
    GraphQL::Schema::UniqueWithinType.encode(type_definition.name, object.id)
  }

  # Given a string UUID, find the object
  object_from_id ->(id, query_ctx) {
    type_name, type_id = GraphQL::Schema::UniqueWithinType.decode(id)

    return query_ctx[:current_user] if type_name == "Viewer"

    unless type_name.safe_constantize.present?
      raise ArgumentError, "Type of object (#{type_name}) does not exist."
    end
    type_name.constantize.find(type_id)
  }

  # Object Resolution
  resolve_type -> (obj, ctx) {
    const = "Types::#{obj.class.name}Type".constantize
    return const if const.is_a? GraphQL::BaseType

    raise NotImplementedError, "Unable to resolve type #{obj.class.name}"
  }
end

AppSchema.rescue_from(ActiveRecord::RecordNotFound) do |error|
  "record_not_found"
end
