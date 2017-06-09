module RedisStore
  Feed = Redis.new(:url => ENV['REDIS_FEED_URL'])
end
