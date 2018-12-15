class MapChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'map_channel'
  end

  def unsubscribed; end

  def refresh_info
    MapService.update_cities_information
  end
end
