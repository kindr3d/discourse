class Admin::StatsController < ApplicationController

  def index

      time = params[:time]

      

      render json: { name: "donut", description: "delicious!", time: time }
    end

end
