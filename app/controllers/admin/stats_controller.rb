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
    visits = total_count UserVisit, "visited_at", time_unit
    users = total_count User, "created_at", time_unit
    topics = total_count Topic, "created_at", time_unit
    posts = total_count Post, "created_at", time_unit
    #TODO redundancy

    #define visit bar chart data
    visit_raw = UserVisit.where("visited_at > ?", time_unit[:visit_limit]).group("DATE_TRUNC('#{time_unit[:unit]}', visited_at)").count
    visit_data = visit_raw.map {|k, v| {label: k.to_s().slice(0, 10), value: v}}.sort_by { |d| d[:label] }
    # TODO identify gaps

    #define user bar chart data
    user_data = user_stats(time_unit)

    topic_data = topic_count(time_unit[:current])
    top_categories = Topic.select("categories.id, categories.name, categories.color, categories.slug, count(topics.id) as thecount").joins(:category).where("topics.created_at > ?", time_unit[:current])
    .group("categories.id").order("thecount DESC").limit(5)


    top_topics = Topic.select(:id, :title, :posts_count).where("created_at > ?", time_unit[:current]).order(posts_count: :desc).limit(5)

    render json: { visit_title: "Visits" , user_title: "Users", topic_title: "Topics", time: time, time_u: time_unit, visit_total: visits, visit_data: visit_data, user_total: users, user_data: user_data, topic_total: topics, topic_data: topic_data, topic_categories: top_categories, post_title: "Posts", post_total: posts, top_topics: top_topics}
    #TODO look into serializer
  end

  private

  # counts total new elements within time unit
  def total_count(target_model, column, time_limit)
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

  # topics created within time_unit arranged by number of replies
  def topic_count(time)
    no_reply =  Topic.where("created_at > ?", time).where("posts_count = 1").count.to_f
    one_reply =  Topic.where("created_at > ?", time).where("posts_count = 2").count.to_f
    many_replies =  Topic.where("created_at > ?", time).where("posts_count > 2").count.to_f
    return [{label: "many", value: many_replies}, {label: "one", value: one_reply}, {label: "no", value: no_reply}]
  end

end
