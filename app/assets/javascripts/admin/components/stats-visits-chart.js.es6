export default Ember.Component.extend({
  data: function(){
    this._super();
    return this.data;
  },
  w: 500,
  h: 250,
  sidePadding: 40,
  properH: function () {
    return this.get("h") - this.get("sidePadding") * 2;
  }.property("h", "sidePadding"),

  transformG: function() {
    return "translate(" + this.get("sidePadding") + "," + this.get("sidePadding") + ")";
  }.property("sidePadding"),

  yScale: function() {
    return d3.scale.linear() // eslint-disable-line no-undef
    .range([this.get("properH"), 0])
    .domain([0, d3.max(this.get("data"), d => d.value)]); // eslint-disable-line no-undef
  }.property("properH", "data"),

  xScale: function() {
    return d3.scale.ordinal() // eslint-disable-line no-undef
    .rangeRoundBands([0, this.get("w") - this.get("sidePadding") * 2], .1)
    .domain(this.get("data").map(d => d.label));
  }.property("w", "properH", "data"),

  xAxisFormat: function() {
    return "translate(0," + this.get("properH") + ")";
  }.property("properH"),

  didInsertElement(){
    drawChart(this.get("data"), this.get("properH"), this.get("xScale"), this.get("yScale"));

    this.set('w', this.$().width());
    this.set('h', this.$().height());
  },

  updateBars: function () {
    drawChart(this.get("data"), this.get("data"), this.get("xScale"), this.get("yScale"));
  }.observes("data")
});

function drawChart(data, properH, xScale, yScale) {
  var x = xScale;
  var y = yScale;
  d3.select("svg") // eslint-disable-line no-undef
  .select("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x",  d => x(d.label))
  .attr("width", x.rangeBand())
  .attr("y", d => y(d.value))
  .attr("height", d => properH - y(d.value))
  .attr("fill", d => "rgb(0, 0, " + (d.value * 2) + ")");
}
