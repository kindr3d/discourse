class Admin::StatsController < ApplicationController

  def index

      time = params[:time]

      time_unit = case time
      when "today"
        1.day.ago
      when "week"
        1.week.ago
      when "month"
        4.weeks.ago
      else
        raise "Invalid time parameter"
      end
      puts time_unit



  


      render json: { name: "donut", description: "delicious!", time: time, time_u: time_unit }
    end

end
