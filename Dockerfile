# FROM heroku/ruby

# RUN apk update && apk add build-base nodejs postgresql-dev

# RUN mkdir /app
# WORKDIR /app

# COPY Gemfile Gemfile.lock ./
# RUN gem install bundler && bundle install

# COPY . .

# LABEL maintainer="Michel Szivanel <michel.szinavel@gmail.com>"

# # Start puma
# CMD bundle exec puma -C config/puma.rb

FROM ruby:2.5.1-alpine

RUN apk add --update build-base postgresql-dev tzdata
RUN gem install rails -v '5.2.1'

WORKDIR /app
ADD Gemfile Gemfile.lock /app/
RUN bundle install

ADD . .
CMD ["puma"]