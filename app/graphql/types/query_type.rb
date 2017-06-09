Types::QueryType = GraphQL::ObjectType.define do
  name 'Query'

  field 'currentUser' do
    type Types::CurrentUserType
    resolve -> (obj, args, ctx) {
      ctx[:current_user]
    }
  end

  connection :activities, Types::ActivityType.connection_type do
    argument :id, types.ID.to_list_type
    argument :filters, Types::ActivityFilterEnum.to_list_type
    argument :order, Types::OrderEnum
    argument :type, Types::ActivityObjectEnum.to_list_type
    resolve Resolvers::Activity.new
  end

  connection :articles, Types::ArticleType.connection_type do
    argument :id, types.ID.to_list_type
    resolve Resolvers::Article.new
  end

  field :categories, Types::TagType.to_list_type do
    argument :scopes, Types::TagScopeEnum.to_list_type
    resolve Resolvers::Tag.new(proc { Tag.categories })
  end

  connection :feed, Types::FeedType do
    argument :slug, !types.String
    resolve Resolvers::Feed.new
  end

  connection :products, Types::ProductType.connection_type do
    argument :id, types.ID.to_list_type
    argument :search, types.String
    argument :slug, types.String
    argument :brand, types.ID.to_list_type
    argument :tag, types.ID.to_list_type
    argument :order, Types::OrderEnum
    resolve Resolvers::Product.new
  end

  connection :reviews, Types::ReviewTypeConnection do
    argument :id, types.ID.to_list_type
    argument :product, types.ID.to_list_type
    argument :order, Types::OrderEnum

    resolve Resolvers::Review.new
  end

  field :sluggable, Types::SluggableUnionType do
    argument :slug, !types.String
    argument :types, !Types::SluggableEnum.to_list_type
    resolve ->(obj,args,ctx) {
      ApplicationRecord.find_sluggable(args['slug'], args['types'])
    }
  end

  connection :tags, Types::TagType.connection_type do
    argument :id, types.ID.to_list_type
    argument :slug, types.String

    resolve Resolvers::Tag.new
  end


  field :node, GraphQL::Relay::Node.field
  field :nodes, GraphQL::Relay::Node.plural_field
end
