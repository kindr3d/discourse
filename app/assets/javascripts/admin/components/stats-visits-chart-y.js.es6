export default Ember.Component.extend({
  tagName:    'g',
  classNames: ['axis'],

  scale:       null,
  orient:      'left',
  ticks:       5,

  yAxis: function() {
    return d3.svg.axis() // eslint-disable-line no-undef
    .scale(this.get('scale'))
    .orient(this.get('orient'))
    .ticks(this.get('ticks'));
  }.property('scale', 'orient', 'ticks'),

  didInsertElement: function() {
    this._updateYAxis();
  },

  onXAxisChange: function() {
    if (this.state !== 'inDOM') return;

    this._updateYAxis();
  }.observes('yAxis'),

  _updateYAxis: function() {
    d3.select(this.$()[0]).call(this.get('yAxis')); // eslint-disable-line no-undef
  }

});
