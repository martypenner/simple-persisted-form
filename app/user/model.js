import DS from 'ember-data';
import EmberValidations from 'ember-validations';

export default DS.Model.extend(EmberValidations.Mixin, {
    name: DS.attr('string'),
    email: DS.attr('string'),
    address: DS.attr('string'),
    city: DS.attr('string'),
    provinceState: DS.attr('string'),
    country: DS.attr('string'),
    postalCode: DS.attr('string'),
    phone: DS.attr('string'),

    validations: {
        name: {
            presence: {message: 'abc'}
        },
        email: {
            format: {'with': /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i}
        },
        postalCode: {
            format: {'with': /[a-z]\d[a-z] ?\d[a-z]\d/i, allowBlank: false}
        }
    }
});
