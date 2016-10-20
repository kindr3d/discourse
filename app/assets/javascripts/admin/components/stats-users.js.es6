export default Ember.Component.extend({
  init(){
    this._super();
    var data = this.stats.user_data;
    this.chart = data.length === 5;
    if (this.chart) {
      for (var bar of data) {
        if (typeof bar !== "object") {
          this.chart = false;
          break;
        } else {
          if (!bar.hasOwnProperty("percent") || !bar.hasOwnProperty("count") || !bar.hasOwnProperty("label")){
            this.chart = false;
            break;
          }
        }
      }
    }
  }
});
