class FieldTimerInstrument
  # If a field was flagged to be timed,
  # wrap its resolve proc with a timer.
  def instrument(type, field)
    if field.metadata[:timed]
      old_resolve_proc = field.resolve_proc
      new_resolve_proc = ->(obj, args, ctx) {
        Rails.logger.info("#{type.name}.#{field.name} START: #{Time.now.to_i}")
        resolved = old_resolve_proc.call(obj, args, ctx)
        Rails.logger.info("#{type.name}.#{field.name} END: #{Time.now.to_i}")
        resolved
      }

      # Return a copy of `field`, with a new resolve proc
      field.redefine do
        resolve(new_resolve_proc)
      end
    else
      field
    end
  end
end
