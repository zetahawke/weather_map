FROM ruby:2.5.1-alpine

RUN apk update && apk add build-base nodejs postgresql-dev

RUN mkdir /app
WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN gem install bundler && bundle install

COPY . .

LABEL maintainer="Michel Szivanel <michel.szinavel@gmail.com>"

# Start puma
CMD bundle exec puma -C config/puma.rb