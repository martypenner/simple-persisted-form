import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    email: DS.attr('string'),
    address: DS.attr('string'),
    city: DS.attr('string'),
    provinceState: DS.attr('string'),
    country: DS.attr('string'),
    postalCode: DS.attr('string'),
    phone: DS.attr('string')
});
