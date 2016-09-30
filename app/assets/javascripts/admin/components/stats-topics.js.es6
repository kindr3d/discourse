export default Ember.Component.extend({
  init(){
    this._super();
    this.cats = this.stats.topic_categories.map(c => { return {id: c.id, href: ("/c/"+c.slug), name: c.name, style: "background-color:#"+c.color, count: c.thecount};});
    console.log(this.cats);
  },
  svg: {},
  pie: {},
  color: {},
  radius: {},
  arc: {},
  outerArc: {},

  didUpdateAttrs() {
    this._super(...arguments);
    this.change();
  },

  change: function(){
    var pieContent = this.get('pageNumber');
    var svg = this.svg,
    pie = this.pie,
    color = this.color,
    radius = this.radius,
    arc = this.arc,
    outerArc = this.outerArc;
    this._super(...arguments);
    var data = this.stats.topic_data;

    var slice = svg.select(".slices").selectAll("path.slice")
    .data(pie(data), d => d.data.label);

    slice.enter()
    .insert("path")
    .style("fill", function(d) { return color(d.data.label); })
    .attr("class", "slice");

    slice
    .transition().duration(1000)
    .attrTween("d", function(d) {
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d); // eslint-disable-line no-undef
      this._current = interpolate(0);
      return function(t) {
        return arc(interpolate(t));
      };
    });

    slice.exit()
    .remove();

    /* ------- TEXT LABELS -------*/

    var text = svg.select(".labels").selectAll("text")
    .data(pie(data), d => d.data.label);

    text.enter()
    .append("text")
    .attr("dy", ".35em")
    .text(function(d) {
      return d.data.label;
    });

    function midAngle(d){
      return d.startAngle + (d.endAngle - d.startAngle)/2;
    }

    text.transition().duration(1000)
    .attrTween("transform", function(d) {
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d); // eslint-disable-line no-undef
      this._current = interpolate(0);
      return function(t) {
        var d2 = interpolate(t);
        var pos = outerArc.centroid(d2);
        pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
        return "translate("+ pos +")";
      };
    })
    .styleTween("text-anchor", function(d){
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);// eslint-disable-line no-undef
      this._current = interpolate(0);
      return function(t) {
        var d2 = interpolate(t);
        return midAngle(d2) < Math.PI ? "start":"end";
      };
    });

    text.exit()
    .remove();

    /* ------- SLICE TO TEXT POLYLINES -------*/

    var polyline = svg.select(".lines").selectAll("polyline")
    .data(pie(data), d => d.data.label);

    polyline.enter()
    .append("polyline");

    polyline.transition().duration(1000)
    .attrTween("points", function(d){
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);// eslint-disable-line no-undef
      this._current = interpolate(0);
      return function(t) {
        var d2 = interpolate(t);
        var pos = outerArc.centroid(d2);
        pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
        return [arc.centroid(d2), outerArc.centroid(d2), pos];
      };
    });

    polyline.exit()
    .remove();


  }
  // .observes("model.@each"),


  didInsertElement(){
    this._super();


    var w = 250,
    h = 200,
    radius = Math.min(w, h) / 2 - 10;
    this.set('radius', radius);

    var color = d3.scale.ordinal() // eslint-disable-line no-undef
    .range(["green", "blue", "red"]);
    this.set('color', color);

    var arc = d3.svg.arc() // eslint-disable-line no-undef
    .outerRadius(radius * 0.8)
    .innerRadius(radius * 0.4);
    this.set('arc', arc);

    var outerArc = d3.svg.arc() // eslint-disable-line no-undef
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);
    this.set('outerArc', outerArc);

    var pie = d3.layout.pie() // eslint-disable-line no-undef
    .sort(null)
    .value(d => d.value);

    this.set('pie', pie);

    var svg = d3.select('.forD3-topics') // eslint-disable-line no-undef
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .append("g")
    .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

    svg.append("g")
    .attr("class", "slices");
    svg.append("g")
    .attr("class", "labels");
    svg.append("g")
    .attr("class", "lines");

    this.set('svg', svg);

    // var g = svg.selectAll(".arc")
    // .data(pie(data))
    // .enter().append("g")
    // .attr("class", "arc");
    //
    // g.append("path")
    // .attr("d", arc)
    // .style("fill", d => color(d.data.label));
    //
    // g.append("text")
    // .attr("transform", d => "translate(" + labelArc.centroid(d) + ")")
    // .attr("dy", ".35em")
    // .text(d => d.data.label);

    this.change();


  }

});
