import componentTest from 'helpers/component-test';

moduleForComponent('stats-posts', {integration: true});

componentTest('test the of post component', {
  template: '{{stats-posts stats=testStat}}',

  setup() {
    this.set('testStat', {
      post_title: "Posts",
      time: "today",
      post_total: {total: 4, compare_percent: 25},
      top_topics: [
        {
          id: 327,
          title: "This is a much better topic, just look at it!",
          posts_count: 3
        },
        {
          id: 328,
          title: "Topic with on answer",
          posts_count: 2
        },
        {
          id: 330,
          title: "Even more topics, astonishing",
          posts_count: 2
        },
        {
          id: 325,
          title: "Restore completed successfully",
          posts_count: 1
        },
        {
          id: 326,
          title: "Great new topic look at it!",
          posts_count: 1
        }
      ]
    });
  },

  test(assert) {
    assert.equal(this.$('.posts-stats-title h1').text(), 'Posts');
    //assert.equal(this.$('.visits-stats-total i').attr('style'), 'color: green;');
    assert.equal(this.$('.stats-total .total').text(), '4');
    assert.equal(this.$('.stats-total .percent').text(), '25%');
    assert.equal(this.$('.posts-stats-time p').text(), 'today');
    assert.equal(this.$('.topics').children().length, 5, "didn't append svg");
  },

});
