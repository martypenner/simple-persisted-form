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

    /**
     * @var {boolean} Whether the postal code can be validated (true if the country is Canada)
     */
    canValidatePostalCode: false,

    /**
     * Update whether we can validate the postal code. Normally a computed property should be enough
     * to handle this nicely, but for some reason that's not working. Bug in the validation tool?
     *
     * TODO: convert this to a computed property when the cause of "no updating" is found
     */
    updateCanValidatePostalCode: Ember.observer('country', function () {
        Ember.run.once(() => {
            this.set('canValidatePostalCode', this.get('country') === 'Canada');
            this.validate();
        });
    }),

    validations: {
        name: {
            presence: {message: 'You need to provide your name.'}
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
                'if': 'canValidatePostalCode',
                'with': /^[a-z]\d[a-z] ?\d[a-z]\d$/i,
                allowBlank: false,
                message: 'Your postal code should look something like this: "A1A 2B2"'
            },
            presence: {
                'if': 'canValidatePostalCode',
                message: 'You need to provide your postal code.'
            }
        }
    }
});
