export default Ember.Component.extend({
init(){
  this._super();
  this.increase = this.stats.visit_total.compare_percent >0;
  this.same = this.stats.visit_total.compare_percent ===0;
  this.exists = this.stats.visit_total.compare_percent !==null;
  console.log(this.same);
  console.log(this.exists);
}

// //Data
  // var dataset = [ 5, 10, 15, 20, 25 ];
  //
  // //Create SVG element
  // var svg = d3.select("svg")
  // // .append("svg");
  // .attr("width", 500)
  // .attr("height", 50);
  //
  // var circles = svg.selectAll("circle")
  // .data(dataset)
  // .enter()
  // .append("circle");
  //
  // circles.attr("cx", function(d, i) {
  // 	return (i * 50) + 25;
  // })
  // .attr("cy", h/2)
  // .attr("r", function(d) {
  // 	return d;
  // });



});
