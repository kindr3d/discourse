export default Ember.Component.extend({
  init(){
    this._super();
    this.increase = this.total.compare_percent > 0;
    this.same = this.total.compare_percent === 0;
    this.exists = this.total.compare_percent !== null;
  },
});
