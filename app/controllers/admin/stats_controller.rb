class Admin::StatsController < ApplicationController

  def index
      render json: { name: "donut", description: "delicious!" }
    end

end
