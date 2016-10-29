import { ajax } from 'discourse/lib/ajax';

export default Ember.Route.extend({
  queryParams: {
    time: {
      refreshModel: false,
      replace: false,
    }
  },

  model(params) {
    console.log(params.time);
    return ajax('/admin/stats/'+params.time+'.json');
  },

  // willTransition: function(transition) {
  //   if ((this.controller.get('admin.stats') === transition.targetName)) {
  //     transition.abort();
  //     // return;
  //   }
  // }
});
