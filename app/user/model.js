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
            presence: {message: 'You must provide your name.'}
        },
        email: {
            format: {
                'with': /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i,
                allowBlank: false,
                message: 'Your email should look something like this: "name@example.com".'
            }
        },
        postalCode: {
            format: {
                'with': /^[a-z]\d[a-z] ?\d[a-z]\d$/i,
                allowBlank: false,
                message: 'Your postal code should look something like this: "A1A 2B2"'
            }
        }
    }
});
