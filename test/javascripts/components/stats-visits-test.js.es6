import componentTest from 'helpers/component-test';

moduleForComponent('stats-visits', {integration: true});

componentTest('test the of visits component', {
  template: '{{stats-visits stats=testStat}}',

  setup() {
    this.set('testStat', {
       visit_title: "Visits",
       time: "today",
       visit_total: {total: 4, compare_percent: 25}
    });
  },

  test(assert) {
    assert.equal(this.$('.visits-stats-title h1').text(), 'Visits');
    //assert.equal(this.$('.visits-stats-total i').attr('style'), 'color: green;');
    assert.equal(this.$('.visits-stats-total .total').text(), '4');
    assert.equal(this.$('.visits-stats-total .percent').text(), '25%');
    assert.equal(this.$('.visits-stats-time p').text(), 'today');
    assert.equal(this.$('.forD3').children().length, 1, "didn't append svg");
  },

});
