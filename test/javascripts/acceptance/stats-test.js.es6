import { acceptance } from "helpers/qunit-helpers";
acceptance("Stats");

test("Visit stats", function(assert) {
  visit("/admin/stats/today");
  andThen(() => {
    assert.ok(exists('.visits-stats-time'), 'the snack title is present');
  });
});
