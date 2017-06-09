Mutations::UpdateModelMutation = GraphQL::Relay::Mutation.define do
  name "UpdateModel"
  description "Updates fields on a model"
  input_field :nodeID, !types.ID
  input_field :fields, !Types::HashType

  return_field :model, Types::ReclineModelUnionType

  resolve ->(_obj, inputs, ctx) {
    raise PermissionError unless ctx[:admin?]
    object = AppSchema.object_from_id(inputs[:nodeID], ctx)
    object.update_attributes(inputs[:fields])
    { model: object }
  }
end
