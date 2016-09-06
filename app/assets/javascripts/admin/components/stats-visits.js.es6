export default Ember.Component.extend({
init(){
  this._super();
  this.increase = this.stats.visit_total.compare_percent >0;
  this.same = this.stats.visit_total.compare_percent ===0;
}


});
