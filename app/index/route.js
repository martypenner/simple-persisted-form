import Ember from 'ember';

const initialId = '-JnaP7QDF6nbU-g0QQ2_';

export default Ember.Route.extend({
    model: function () {
        return this.store.find('user', initialId);
    }
});
