Rails.application.routes.draw do
  post '/graphql', to: 'graphql#execute'
  devise_for :users, controllers: { sessions: 'sessions' }

  match '(admin|products|articles)(/*path)', to: 'application#catch_all', via: :all

  # API Endpoint for Contentful
  mount ContentfulRails::Engine => '/contentful'

  match '*slug', to: 'application#catch_all', via: :all
  root 'frontpage#index'
end
