class ForecastService
  def initialize(props = {})
    @props = props
  end

  def info
    random_failed?
    ForecastIO.forecast(@props[:lat], @props[:lon])
  end

  def random_failed?
    raise ForecastApiCallError.new('How unfortunate! The API Request Failed') if rand(0.0..1.0) < 0.1
  rescue ForecastApiCallError => e
    puts e.message
    $redis.set('api.errors', { Time.now => e.message }.to_json)
    self.info
  end
end
