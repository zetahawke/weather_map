class WelcomeController < ApplicationController
  def map
    @coords = JSON.parse($redis.get('cities'))['all'].map{ |city| JSON.parse($redis.get(city)) }
  end
end
