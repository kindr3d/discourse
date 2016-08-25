export default Ember.Component.extend({
  didInsertElement() {
    this._super();
    this.$().animate({ backgroundColor: "yellow" }, 2000);
    
  },

  willDestroyElement() {
    this._super();
    this.$().stop();
  }
});
