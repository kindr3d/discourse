export default Ember.Component.extend({
  didInsertElement(){
    this._super();
    var data = this.stats.topic_data;

    var w = 250,
    h = 200,
    radius = Math.min(w, h) / 2 - 10;

    var color = d3.scale.ordinal() // eslint-disable-line no-undef
    .range(["green", "blue", "red"]);

    var arc = d3.svg.arc() // eslint-disable-line no-undef
    .outerRadius(radius - 10)
    .innerRadius(30);

    var labelArc = d3.svg.arc() // eslint-disable-line no-undef
    .outerRadius(radius + 10)
    .innerRadius(radius + 10);

    var pie = d3.layout.pie() // eslint-disable-line no-undef
    .sort(null)
    .value(d => d.value);

    var svg = d3.select('.forD3-topics') // eslint-disable-line no-undef
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .append("g")
    .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

    var g = svg.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class", "arc");

    g.append("path")
    .attr("d", arc)
    .style("fill", d => color(d.data.label));

    g.append("text")
    .attr("transform", d => "translate(" + labelArc.centroid(d) + ")")
    .attr("dy", ".35em")
    .text(d => d.data.label);
  }

});
