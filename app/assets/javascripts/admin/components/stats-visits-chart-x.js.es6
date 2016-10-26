export default Ember.Component.extend({
  tagName: 'g',
  classNames: ['axis'],

  attributeBindings: ['transform'],

  scale: null,
  orient:'botom',

  xAxis: function() {
    return d3.svg.axis() // eslint-disable-line no-undef
    .scale(this.get('scale'))
    .orient(this.get('orient'));
  }.property('scale', 'orient'),

  didInsertElement: function() {
    this._updateXAxis();
  },

  onXAxisChange: function() {
    if (this.state !== 'inDOM') return;

    this._updateXAxis();
  }.observes('xAxis'),

  _updateXAxis: function() {
    d3.select(this.$()[0]).call(this.get('xAxis'));
  }

});
