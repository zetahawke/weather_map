class WelcomeController < ApplicationController
  def map
    @coords = JSON.parse($redis.get('cities'))
  end
end
