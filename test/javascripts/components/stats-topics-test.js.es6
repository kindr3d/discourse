import componentTest from 'helpers/component-test';

moduleForComponent('stats-topics', {integration: true});

componentTest('test the of topic component', {
  template: '{{stats-topics stats=testStat}}',

  setup() {
    this.set('testStat', {
       topic_title: "Topics",
       time: "today",
       topic_total: {total: 4, compare_percent: 25}
    });
  },

  test(assert) {
    assert.equal(this.$('.topics-stats-title h1').text(), 'Topics');
    //assert.equal(this.$('.topic-stats-total i').attr('style'), 'color: green;');
    assert.equal(this.$('.topics-stats-total .total').text(), '4');
    assert.equal(this.$('.topics-stats-total .percent').text(), '25%');
    assert.equal(this.$('.topics-stats-time p').text(), 'today');
    //assert.equal(this.$('.forD3-topic').children().length, 1, "didn't append svg");
  },

});
