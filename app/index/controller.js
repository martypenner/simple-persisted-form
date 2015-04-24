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
     * @var {object} A run loop reference so we cancel at will. Used in timing the submit button states.
     */
    runLater: null,

    /**
     * @var {object} Submit button states
     */
    isSaving: false,
    isSaveSuccessful: false,

    /**
     * @var {string} Any error messages that are received while saving
     */
    saveError: null,

    /**
     * @var {string} The message to show in the submit button
     */
    submitMessage: function () {
        let text = 'Save My Info';
        if (this.get('isSaving')) {
            text = 'Saving...';
        } else if (this.get('isSaveSuccessful')) {
            text = 'Saved!';
        }

        return text;
    }.property('isSaving', 'isSaveSuccessful'),

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
        updateUser: function () {
            this.setProperties({
                isSaving: true,
                saveError: null,
                isSaveSuccessful: false
            });

            Ember.run.cancel(this.get('runLater'));

            this.get('model').save().then(() => {
                this.set('isSaveSuccessful', true);
            }).catch((reason) => {
                this.set('saveError', `Oh no! There was a problem saving your info: ${reason.message}`);
            }).then(() => {
                this.set('isSaving', false);
                this.set('runLater', Ember.run.later(() => {
                    try {
                        this.set('isSaveSuccessful', false);
                    } catch (e) {
                    }
                }, 2000));
            });
        },

        /**
         * Close any open alerts.
         * TODO: this should be scoped in a component, but this works for now.
         */
        closeAlert: function () {
            Ember.$('.alert-box').slideUp(function () {
                $(this).remove();
            });
        }
    }
});
