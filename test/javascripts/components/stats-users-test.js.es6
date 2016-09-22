import componentTest from 'helpers/component-test';

moduleForComponent('stats-users', {integration: true});

componentTest('test the of user component', {
  template: '{{stats-users stats=testStat}}',

  setup() {
    this.set('testStat', {
       user_title: "Users",
       time: "today",
       user_total: {total: 4, compare_percent: 25}
    });
  },

  test(assert) {
    assert.equal(this.$('.users-stats-title h1').text(), 'Users');
    //assert.equal(this.$('.visits-stats-total i').attr('style'), 'color: green;');
    assert.equal(this.$('.users-stats-total .total').text(), '4');
    assert.equal(this.$('.users-stats-total .percent').text(), '25%');
    assert.equal(this.$('.users-stats-time p').text(), 'today');
  //  assert.equal(this.$('.forD3-useres').children().length, 1, "didn't append svg");
  },

});
