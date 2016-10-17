export default Ember.Component.extend({
  init(){
    this._super();
    this.chart = this.stats.user_data.length > 3;//TODO check insides
  }
});
