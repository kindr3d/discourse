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
    //var data = this.stats.visit_data;
    //fake data for testing
    var data= [["2016-08-15 00:00:00 UTC", 2],
    ["2016-08-22 00:00:00 UTC", 7],
    ["2016-08-29 00:00:00 UTC", 10],
    ["2016-09-05 00:00:00 UTC", 4]];

    var w = 400;
    var h = 150;
    var barPadding = 5;

    var svg = d3.select('.forD3')
    .append("svg")
    .attr("width", w)
    .attr("height", h);

    svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x",  function(d, i) {
      return i * (w / data.length);
    })
    .attr("y", function (d) {
      return h - d[1] *10;
    })
    .attr("width", w / data.length - barPadding)
    .attr("height", function(d) {
      return d[1] * 10;
    })
    .attr("fill", function(d) {
      return "rgb(0, 0, " + (d[1] * 50) + ")";
    });

    var yScale = d3.scale.linear()
    .domain([d3.min(data, function(d) {
      return d[1]; }), d3.max(data, function(d) {
        return d[1]; })])
        .range([0, h]);

        var xScale = d3.scale.linear()
        .domain(data.map(function(d) { return d[0]; }))
        .range([0, w]);

        var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

        var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(10, "%");

        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + h + ")")
        .call(xAxis);

        svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

      }

    });
