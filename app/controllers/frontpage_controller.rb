class FrontpageController < ApplicationController

  def index
    feed = execute_query(:frontpage, variables: { slug: "all" })
    render locals: { feed: feed }
  end

end
