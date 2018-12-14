# frozen_string_literal: true
require 'geocoder'

cities = ['Santiago (CL)', 'Zurich (CH)', 'Auckland (NZ)', 'Sydney (AU)', 'Londres (UK)', 'Georgia (USA)']

$redis.set('cities', {all: cities}.to_json)

cities.each do |city|
  coord = Geocoder.search(city).first
  next unless coord&.data

  $redis.set(city, { lat: coord.data['lat'], lon: coord.data['lon'] }.to_json)
end
