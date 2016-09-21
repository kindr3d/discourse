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
    user_count = total_count User, "created_at", time_unit #TODO redundancy
    topic_count = total_count Topic, "created_at", time_unit
    post_count = total_count Post, "created_at", time_unit

    #define visit bar chart data
    visit_data = UserVisit.where("visited_at > ?", time_unit[:visit_limit]).group("DATE_TRUNC('#{time_unit[:unit]}', visited_at)").count.map {|k, v|
      {label: k.to_s().slice(0, 10), value: v}}.sort_by { |d| d[:label] }

    #define user bar chart data
    user_data = user_stats(time_unit)

    render json: { visit_title: "Visits" , user_title: "Users", time: time, time_u: time_unit, visit_total: visit_count, visit_data: visit_data, user_total: user_count, topic_total: topic_count, user_data: user_data}
    #TODO look into serializer
  end

  private

  # counts total new elements within time unit
  def total_count(target_model, column, time_limit) #TODO break in two see Max;s suggestions
    total = target_model.where("#{column} > ?", time_limit[:current]).count.to_f #active record
    total_last = target_model.where("#{column} > ? AND #{column} <= ?", time_limit[:previous], time_limit[:current]).count.to_f #active record
    if total_last > 0 #avoid dividing by 0
      compare = ((total/total_last -1) * 100).round(1)
    end
    return {total: total, last:total_last, compare_percent: compare}
  end

  # returns full user stats within time unit
  def user_stats(time_limit)
    all_users = User.count.to_f
    visited = user_count all_users, "last_seen_at >? ", time_limit[:current], "visited"
    active = user_count all_users, "active = ?", true, "active"
    posted = user_count all_users, "last_posted_at > ?", time_limit[:current], "posted"
    registered = user_count all_users, "created_at > ?", time_limit[:current], "registered"
    online = user_count all_users, "last_seen_at > ?", 1.hour.ago, "online"
    return [visited, active, posted, registered, online]
  end

  # return the count and percent for each statistics
  def user_count(all, expression, param, label)
    count = User.where(expression, param).count.to_f
    percent = (count/all * 100).round(1)
    return {count: count, percent: percent, label: label}
  end

end
