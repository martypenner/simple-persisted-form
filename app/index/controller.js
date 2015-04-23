import Ember from 'ember';

export default Ember.Controller.extend({
    /**
     * @var {array} List of countries to choose from
     */
    countries: [],

    /**
     * @var {boolean} Whether to show the postal code field (only if selected country is Canada)
     */
    shouldShowPostalCodeField: Ember.computed.equal('model.canValidatePostalCode', true),

    /**
     * @var {boolean} Whether the model is being persisted right now
     */
    isSaving: false,

    /**
     * @var {boolean} Whether the submit button should be disabled based on the model being valid and persisted.
     */
    isSubmitDisabled: Ember.computed('model.isValid', 'isSaving', function () {
        return this.get('isSaving') || !this.get('model.isValid');
    }),

    actions: {
        /**
         * Persist the model, showing success or error messages based on the outcome.
         */
        updateUser() {
            this.set('isSaving', true);
            this.get('model').save()
                .then(function () {
                    throw new Error('failed bwah');
                }).catch(function (reason) {
                    console.log(reason.message);
                }).finally(() => {
                    this.set('isSaving', false);
                });
        }
    }
});
