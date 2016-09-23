import componentTest from 'helpers/component-test';

moduleForComponent('stats-users', {integration: true});

componentTest('test the of user component', {
  template: '{{stats-users stats=testStat}}',

  setup() {
    this.set('testStat', {
      user_title: "Users",
      time: "today",
      user_total: {total: 4, compare_percent: 25},
      user_data: [
        {
          count: 43,
          percent: 6.4,
          label: "visited"
        },
        {
          count: 86,
          percent: 91.5,
          label: "active"
        },
        {
          count: 13,
          percent: 7.4,
          label: "posted"
        },
        {
          count: 9,
          percent: 9.6,
          label: "registered"
        },
        {
          count: 11,
          percent: 1.1,
          label: "online"
        }
      ]
    });
  },

  test(assert) {
    assert.equal(this.$('.users-stats-title h1').text(), 'Users');
    //assert.equal(this.$('.visits-stats-total i').attr('style'), 'color: green;');
    assert.equal(this.$('.stats-total .total').text(), '4');
    assert.equal(this.$('.stats-total .percent').text(), '25%');
    assert.equal(this.$('.users-stats-time p').text(), 'today');
    assert.equal(this.$('.forD3-users').children().length, 1, "didn't append svg");
  },

});
