export default Ember.Component.extend({
  init(){
    this._super();
    this.increase = this.stats.user_total.compare_percent >0;
    this.same = this.stats.user_total.compare_percent ===0;
    this.exists = this.stats.user_total.compare_percent !==null;
    console.log(this.same);
    console.log(this.exists);
  },

  didInsertElement(){

    }
  });
