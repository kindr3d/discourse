export default Ember.Component.extend({
  // classNames: ['stats-each'],
  didInsertElement() {
    this._super();
    var data = this.data;

    var w = 500;
    var h = 250;
    var sidePadding = 40;
    var properH = h - sidePadding * 2;

    var svg = d3.select('.forD3-visits') // eslint-disable-line no-undef
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .append("g")
      .attr("transform", "translate(" + sidePadding + "," + sidePadding + ")");

    var yScale = d3.scale.linear() // eslint-disable-line no-undef
      .range([properH, 0])
      .domain([0, d3.max(data, d => d.value)]); // eslint-disable-line no-undef


    var xScale = d3.scale.ordinal() // eslint-disable-line no-undef
      .rangeRoundBands([0, w - sidePadding * 2], .1)
      .domain(data.map(d => d.label));

    var xAxis = d3.svg.axis() // eslint-disable-line no-undef
      .scale(xScale)
      .orient("bottom");

    var yAxis = d3.svg.axis() // eslint-disable-line no-undef
      .scale(yScale)
      .orient("left")
      .ticks(5);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + properH + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("y", 6)
      .attr("dy", 0)
      .style("text-anchor", "end");

    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.label))
      .attr("width", xScale.rangeBand())
      .attr("y", d => yScale(d.value))
      .attr("height", d => properH - yScale(d.value))
      .attr("fill", d => "rgb(0, 0, " + (d.value * 2) + ")");

  }
});
