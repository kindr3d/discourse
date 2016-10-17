export default Ember.Component.extend({
  init(){
    this._super();
    this.chart = this.stats.visit_data.length > 2; //TODO check consistency 
  },
});
