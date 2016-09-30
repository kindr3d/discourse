import { ajax } from 'discourse/lib/ajax';

export default Ember.Route.extend({
  queryParams: {
    time: {
      refreshModel: true,
      replace: false,
    }
  },

  model(params) {
    return ajax('/admin/stats.json?time='+params.time);
    // this.set
  },


});
