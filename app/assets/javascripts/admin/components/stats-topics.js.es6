export default Ember.Component.extend({
  didInsertElement(){
    this._super();
    var data = this.stats.visit_data;

    var w = 500;
    var h = 250;

    var svg = d3.select('.forD3-topics') // eslint-disable-line no-undef
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  }

});
