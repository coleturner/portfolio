require "image_processing/mini_magick"

class ImageUploader < Shrine
  include ImageProcessing::MiniMagick
  plugin :backgrounding
  plugin :processing
  plugin :parallelize, threads: 5
  plugin :versions
  plugin :store_dimensions
  plugin :remote_url, max_size: 10*1024*1024
  plugin :validation_helpers
  plugin :determine_mime_type

  process(:store) do |io, context|
    original = resize_to_limit(io.download, 1200, 1200)
    feed = resize_to_limit(original, 800, 800)
    preview = resize_to_limit(feed, 300, 300)
    thumb = resize_to_limit(preview, 120, 120)

    {original: original, feed: feed, preview: preview, thumb: thumb}
  end

  Attacher.validate do
    validate_max_size(10*1024*1024, message: "is too large (max is 10 MB)") # unless record.admin?
    validate_extension_inclusion [/jpe?g/, "gif", "png"]
    validate_mime_type_inclusion %w[image/jpeg image/gif image/png]
  end

end
