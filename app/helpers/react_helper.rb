module ReactHelper

  def render_react(component, props: {}, tag: :div, id: "rc#{rand(12**24).to_s(12)}")
    options = { tag: tag, id: id }
    render partial: 'shared/react_component', locals: { component: component, props: props, options: options }
  end

  def react_dispatch(action=nil, **params)
    @react_dispatch_events ||= []

    cmd = { :action => action, :params => params }

    unless action.nil?
      @react_dispatch_events.push(cmd)
    end

    @react_dispatch_events
  end

end
