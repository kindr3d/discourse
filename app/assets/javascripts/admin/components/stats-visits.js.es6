export default Ember.Component.extend({
  init(){
    this._super();
    this.increase = this.stats.visit_total.compare_percent >0;
    this.same = this.stats.visit_total.compare_percent ===0;
    this.exists = this.stats.visit_total.compare_percent !==null;
    console.log(this.same);
    console.log(this.exists);
  },

  didInsertElement(){
    this._super();
    var data = this.stats.visit_data;

    var w = 500;
    var h = 250;
    var sidePadding = 40;
    var properH = h - sidePadding*2;

    var svg = d3.select('.forD3')
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .append("g")
    .attr("transform", "translate(" + sidePadding + "," + sidePadding + ")");

    var yScale = d3.scale.linear()
    .range([properH, 0])
    .domain([0, d3.max(data, function(d) {  return d.value; })]);


      var xScale = d3.scale.ordinal()
      .rangeRoundBands([0, w-sidePadding*2], .1)
      .domain(data.map(function(d) { return d.label; }));

      var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom");

      var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left")
      .ticks(5);

      svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + properH + ")")
      .call(xAxis);

      svg.append("g")
      .attr("class", "y axis")
      //.attr("transform", "translate(" + sidePadding +",0)")
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
      .attr("x",  function(d) {
        return xScale(d.label);
      })
      .attr("width", xScale.rangeBand())
      .attr("y", function (d) {
        return yScale(d.value);
      })
      .attr("height", function(d) {
        return properH -yScale(d.value) ;
      })
      .attr("fill", function(d) {
        return "rgb(0, 0, " + (d.value*2) + ")";
      });

    }
  });
