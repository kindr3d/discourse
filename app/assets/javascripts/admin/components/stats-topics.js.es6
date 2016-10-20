export default Ember.Component.extend({
  init(){
    this._super();
    var data = this.stats.topic_data;
    this.cats = this.stats.topic_categories.map(c => {
                  return {id: c.id, href: ("/c/"+c.slug), name: c.name,
                          style: "background-color:#"+c.color, count: c.thecount
                };});//TODO check the lint rules
    this.chart = data.length === 3;//TODO check if objects
    if (this.chart) {
      for (var bar of data) {
        if (typeof bar !== "object") {
          this.chart = false;
          break;
        } else {
          if (!bar.hasOwnProperty("label") || !bar.hasOwnProperty("value")){
            this.chart = false;
            break;
          }
        }
      }
    }
  }

});
