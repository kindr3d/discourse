import componentTest from 'helpers/component-test';

moduleForComponent('stats-arrows', {integration: true});

componentTest('test the of arrow component', {
  template: '{{stats-arrows total=testStat}}',

  setup() {
    this.set('testStat', {
      total: 4,
      compare_percent: 25
    });
  },

  test(assert) {
    assert.equal(this.$('.stats-total .total').text(), '4');
    assert.equal(this.$('.stats-total .percent').text(), '25%');
  },

});
