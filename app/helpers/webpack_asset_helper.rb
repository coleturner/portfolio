module WebpackAssetHelper

  def webpack_asset_path(path, type = nil)
    path = REV_MANIFEST[path] if defined?(REV_MANIFEST) and REV_MANIFEST.key? path
    path = "#{type}/#{path}" unless type.nil?
    "/assets/#{path}"
  end

  def webpack_js_path(path)
    webpack_asset_path(path, 'javascripts')
  end

  def webpack_css_path(path)
    webpack_asset_path(path, 'stylesheets')
  end

  def webpack_img_path(path)
    webpack_asset_path(path, 'images')
  end

  def webpack_icon_path(path)
    webpack_asset_path(path, 'icons')
  end
end
