export default Ember.Component.extend({
  didInsertElement(){
    this._super();
    var data = this.stats.user_data;

    var w = 500;
    var h = 250;

    var svg = d3.select('.forD3-users') // eslint-disable-line no-undef
    .append("svg")
    .attr("width", w)
    .attr("height", h);

    var yScale = d3.scale.ordinal() // eslint-disable-line no-undef
    .rangeRoundBands([0, h], .5)
    .domain(data.map(d => d.label));


    var xScale = d3.scale.linear() // eslint-disable-line no-undef
    .range([0, w ])
    .domain([0, d3.max(data, d => d.count)]); // eslint-disable-line no-undef
    //TODO decide the domain (100 percent or highest number in the stats)

    var bars = svg.selectAll("rect")
    .data(data)
    .enter()
    .append("g");

    bars.append("rect") //bars themseles
    .attr("class", "bar")
    .attr("x", 0)
    .attr("y", d => yScale(d.label))
    .attr("width", d => xScale(d.percent))
    .attr("height", yScale.rangeBand())
    .attr("fill", d => "rgb(0, 0, " + (d.count * 2) + ")");

    bars.append("text") //texts
    .text( d => d.label + " " + d.count + " (" + d.percent + "%)")
    .attr("x", 0)
    .attr("y", d => yScale(d.label) - 10)
    .attr("font-family", "sans-serif")
    .attr("font-size", "10px")
    .attr("fill", "black");
  }

});
