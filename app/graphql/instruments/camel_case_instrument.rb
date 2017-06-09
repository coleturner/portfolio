class CamelCaseInstrument
  def instrument(type, field)
    if field.arguments.keys.any? { |k| k.to_s.camelize(:lower) != k.to_s }
      old_resolve_proc = field.resolve_proc
      new_resolve_proc = ->(obj, args, ctx) {
        args = Hash[args.map{ |k, v| [k.underscore, v] }]
        old_resolve_proc.call(obj, args, ctx)
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
