class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception,  unless: -> { request.format.json? }

  before_action :set_format
  before_action :set_paper_trail_whodunnit

  def query_context
    {
      current_user: Viewer.new(current_user),
      admin?: true || current_user && current_user.role?(:admin)
    }
  end

  def catch_all
    props = { }

    if params.key? :slug
      sluggable = ApplicationRecord.find_sluggable(params[:slug], [Tag, Article])
      render status: :not_found if sluggable.nil?
      props[:slug] = sluggable
    end

    prerender props: props
  end

  def set_format
    request.format = :prerender if browser.bot?
    request.format
  end

  def prerender(**keywords)
    is_prerender = request.format == :prerender
    view_exists = lookup_context.template_exists?(action_name, controller_name)

    if is_prerender && view_exists
      if File.exists(Rails.root.join('app', 'graphql', 'queries', "#{controller_name}/#{action_name}.graphql"))
        props = keywords[:props] || {}
        result = execute_query("#{controller_name}/#{action_name}", props: props)
        render locals: result
        return
      end

      render
    elsif request.format == :html
      render 'shared/_router'
    end
  end

  def execute_query(query_name, variables: {}, context: {})
    default_context = {
      current_user: current_user
    }

    parsed_name = query_name.to_s.sub('_', '/')

    query_str = File.read(Rails.root.join('app', 'graphql', 'queries', "#{parsed_name.to_s}.graphql"))
    AppSchema.execute(query_str, variables: variables.stringify_keys, context: default_context.merge(context))
  end

end
