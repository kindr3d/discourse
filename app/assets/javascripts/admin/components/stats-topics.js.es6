export default Ember.Component.extend({
  init(){
    this._super();
    this.increase = this.stats.topic_total.compare_percent > 0;
    this.same = this.stats.topic_total.compare_percent === 0;
    this.exists = this.stats.topic_total.compare_percent !== null;
  },

  didInsertElement(){}

});
