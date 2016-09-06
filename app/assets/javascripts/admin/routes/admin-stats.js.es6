import { ajax } from 'discourse/lib/ajax';

export default Ember.Route.extend({
  model(params) {
    return ajax('/admin/stats/'+params.time+'.json');
  }
});
