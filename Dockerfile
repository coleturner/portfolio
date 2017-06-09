FROM colept/edc_rails:2.4.0

ENV RAILS_ENV development

# Run bundler to cache dependencies
RUN apt-get install -y inotify-tools

RUN mkdir -p /app/user/vendor

COPY ["Gemfile", "Gemfile.lock", "/app/user/"]
RUN bundle install --binstubs --path /app/ruby/bundle --jobs 4

ADD . /app/user
VOLUME ["/app/user/public"]
CMD ["/app/user/bin/puma", "-C", "config/puma.rb"]
