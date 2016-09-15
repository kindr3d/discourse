class Admin::StatsController < Admin::AdminController

  def index

    time = params[:time]

    time_unit = case time
    when "today"
      {current: 1.day.ago, previous: 2.days.ago, visit_limit: 1.week.ago - 1.day, unit: "day"}
    when "week"
      {current: 1.week.ago, previous: 2.weeks.ago, visit_limit: 1.week.ago - 1.day, unit: "day"}
    when "month"
      {current: 4.weeks.ago, previous: 8.weeks.ago, visit_limit: 4.weeks.ago - 1.week, unit: "week"}
    else
      raise Discourse::NotFound
    end


    #define component counts
    visit_count = total_count UserVisit, "visited_at", time_unit
    user_count = total_count User, "created_at", time_unit
    topic_count = total_count Topic, "created_at", time_unit
    post_count = total_count Post, "created_at", time_unit

    #define visit bar chart data

    visit_data = UserVisit.where("visited_at > ?", time_unit[:visit_limit]).group("DATE_TRUNC('#{time_unit[:unit]}', visited_at)").count.map {|k, v|
      {label: k.to_s().slice(0,10), value: v}}.sort_by { |d| d[:label] }

    render json: { visit_title: "Visits", time: time, time_u: time_unit, visit_total: visit_count, visit_data: visit_data, user_total: user_count, topic_total: topic_count}
  end


  # function that counts total new elements within time unit
  def total_count(target_model, column, time_limit)
    total = target_model.where("#{column} > ?", time_limit[:current]).count.to_f #active record
    total_last = target_model.where("#{column} > ? AND #{column} <= ?", time_limit[:previous], time_limit[:current]).count.to_f #active record
    if total_last > 0 #avoid dividing by 0
      compare = ((total/total_last -1) *100).round(1)
    end
    return {total: total, last:total_last, compare_percent: compare}
  end


end
