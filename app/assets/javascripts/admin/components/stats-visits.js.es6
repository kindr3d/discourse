export default Ember.Component.extend({
  init(){
    this._super();
    var data = this.stats.visit_data;
    this.chart = data.length > 2; //TODO check dates
    if (this.chart) {
      for (var bar of data) {
        if (typeof bar !== "object") {
          this.chart = false;
          break;
        } else {
          if (!bar.hasOwnProperty("label") || !bar.hasOwnProperty("value")){
            this.chart = false;
            break;
          }
        }
      }
    }
  },
});
