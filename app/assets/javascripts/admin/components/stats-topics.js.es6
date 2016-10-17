export default Ember.Component.extend({
  init(){
    this._super();
    this.cats = this.stats.topic_categories.map(c => { return {id: c.id, href: ("/c/"+c.slug), name: c.name, style: "background-color:#"+c.color, count: c.thecount};});
    this.chart = this.stats.topic_data.length === 3;
  }

});
