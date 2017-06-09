Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :updateModel, Mutations::UpdateModelMutation.field
end
