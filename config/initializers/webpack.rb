REV_MANIFEST_PATH = 'public/assets/manifest.json'

if File.exist?(REV_MANIFEST_PATH)
  REV_MANIFEST = JSON.parse(File.read(REV_MANIFEST_PATH))
end
