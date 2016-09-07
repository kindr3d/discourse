class Admin::StatsController < Admin::AdminController

  def index

      time = params[:time]

      time_unit = case time
      when "today"
        {current: 1.day.ago, previous: 2.days.ago}
      when "week"
        {current: 1.week.ago, previous: 2.weeks.ago}
      when "month"
        {current: 4.weeks.ago, previous: 8.weeks.ago}
      else
        raise Discourse::NotFound
      end


      # function that counts total new elements within time unit
      def total_count(target_model, column, time_limit)
        total = target_model.where("#{column} > ?", time_limit[:current]).count.to_f #active record
        total_last = target_model.where("#{column} > ?", time_limit[:previous]).count.to_f #active record
        if total_last > 0 #avoid dividing by 0
          compare = ((total/total_last -1) *100).round(1)
        end
        return {total: total, compare_percent: compare}
      end


      #define models
      visit_count = total_count UserVisit, "visited_at", time_unit
      user_count = total_count User, "created_at", time_unit
      topic_count = total_count Topic, "created_at", time_unit
      post_count = total_count Post, "created_at", time_unit


      render json: { visit_title: "Visits", time: time, time_u: time_unit, visit_total: visit_count, user_total: user_count, topic_total: topic_count}
    end

end
