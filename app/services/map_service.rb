class MapService
  def self.initialize_cities_coords(cities = City::STUB_CITIES)
    cities_with_their_info = cities.map do |city|
      returned_info_hash(city)
    end
    $redis.set('cities', cities_with_their_info.to_json)
  end

  def self.update_cities_information
    cities_with_their_info = JSON.parse($redis.get('cities')).map do |city|
      returned_info_hash(city.keys.first)
    end
    $redis.set('cities', cities_with_their_info.to_json)
    ActionCable.server.broadcast 'map_channel',
            coords: cities_with_their_info
  end

  def self.returned_info_hash(city)
    city_info = Geocoder.search(city).first
    return unless city_info&.data

    coords = { lat: city_info.data['lat'], lon: city_info.data['lon'] }
    forecast_info = ForecastService.new(coords).info
    { city => coords.merge(time: Time.at(forecast_info['currently']['time']).to_s, temp: forecast_info['currently']['temperature']) }
  end
end
