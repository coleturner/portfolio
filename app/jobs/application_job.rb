class ApplicationJob < ActiveJob::Base
  def perform(job, *args)
    send(job.to_s, *args)
  end
end
