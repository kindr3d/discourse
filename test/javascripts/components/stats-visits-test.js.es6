import componentTest from 'helpers/component-test';

moduleForComponent('stats-visits', {integration: true});

componentTest('test the of visits component', {
  template: '{{stats-visits stats=testStat}}',

  setup() {
    this.set('testStat', {
      visit_title: "Visits",
      time: "today",
      visit_total: {total: 4, compare_percent: 25},
      visit_data: [
        {
          count: 6,
          percent: 6.4,
          label: "visited"
        },
        {
          count: 86,
          percent: 91.5,
          label: "active"
        },
        {
          count: 7,
          percent: 7.4,
          label: "posted"
        },
        {
          count: 9,
          percent: 9.6,
          label: "registered"
        },
        {
          count: 1,
          percent: 1.1,
          label: "online"
        }
      ]
    });
  },

  test(assert) {
    assert.equal(this.$('.visits-stats-title h1').text(), 'Visits');
    //assert.equal(this.$('.visits-stats-total i').attr('style'), 'color: green;')
    assert.equal(this.$('.stats-total .total').text(), '4');
    assert.equal(this.$('.stats-total .percent').text(), '25%');;
    assert.equal(this.$('.visits-stats-time p').text(), 'today');
    assert.equal(this.$('.forD3-visits').children().length, 1, "didn't append svg");
  },

});
