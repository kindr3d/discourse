import { acceptance } from "helpers/qunit-helpers";
acceptance("Stats");

test("Admin stats", function(assert) {
  visit("/admin/stats/today");
  andThen(() => {
    assert.ok(exists('.visits-stats-title'), 'the stats title is present');
    assert.ok(exists('.users-stats-title'), 'the stats title is present');
    assert.ok(exists('.topics-stats-title'), 'the stats title is present');
    assert.equal(find('.forD3-visits').children().length, 1, "didn't append visit chart");
    assert.equal(find('.forD3-users').children().length, 1, "didn't append user chart");
    assert.equal(find('.forD3-topics').children().length, 1, "didn't append topic chart");
  });
});
