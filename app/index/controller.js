import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['existingId', 'simulatedError'],

    /**
     * @var {string} Track any passed-in existing ID
     */
    existingId: null,

    /**
     * @var {boolean} A simulated error message to display
     */
    simulatedError: null,

    /**
     * Setup an existing user as the model in order to test real-time updates.
     */
    setupExistingUser: Ember.observer('existingId', function () {
        if (Ember.isNone(this.get('existingId'))) {
            return;
        }

        this.store.find('user', this.get('existingId')).then((model) => {
            let provinceState = model.get('provinceState');
            this.set('model', model);

            // Defer until current actions are complete before restoring the now-overwritten provinceState
            Ember.run.scheduleOnce('actions', () => {
                this.set('model.provinceState', provinceState);
            });
        }).catch(function () {
            // Do nothing; we don't need to catch this case since we're passing in an ID anyway
        });
    }),

    /**
     * @var {array} List of countries to choose from
     */
    countries: [],

    /**
     * @var {array} List of US states to choose from
     */
    states: [],

    /**
     * @var {array} List of provinces to choose from
     */
    provinces: [],

    /**
     * Computed property to handle outputting a list of provinces, states, or nothing.
     * Used in a select component.
     */
    provincesOrStates: Ember.computed('model.country', function () {
        let provincesOrStates = null;
        let country = this.get('model.country');
        if (country === 'Canada') {
            provincesOrStates = this.get('provinces');
        } else if (country === 'United States') {
            provincesOrStates = this.get('states');
        }

        return provincesOrStates;
    }),

    /**
     * Ensure the province/state is set to something that exists within the province or state
     * list if not dealing with a free-form input field.
     */
    resetUserProvinceOrStateOnCountryChange: Ember.observer('model.country', function () {
        Ember.run.next(() => {
            if (Ember.isNone(this.get('provincesOrStates.firstObject'))) {
                return;
            }

            let existingItem = this.get('provincesOrStates').find((provinceOrState) => {
                return this.get('model.provinceState') === provinceOrState;
            });

            if (Ember.isNone(existingItem)) {
                this.set('model.provinceState', this.get('provincesOrStates.firstObject'));
            }
        });
    }),

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
    submitMessage: Ember.computed('isSaving', 'isSaveSuccessful', function () {
        let text = 'Save My Info';
        if (this.get('isSaving')) {
            text = 'Saving...';
        } else if (this.get('isSaveSuccessful')) {
            text = 'Saved!';
        }

        return text;
    }),

    /**
     * @var {boolean} Whether the submit button should be disabled based on the model being valid and persisted.
     */
    isSubmitDisabled: Ember.computed('model.isValid', 'isSaving', function () {
        return this.get('isSaving') || !this.get('model.isValid');
    }),

    /**
     * Update the stored id after persisting the user.
     */
    onUpdateSaveSuccessful: Ember.observer('isSaveSuccessful', function () {
        Ember.run.once(() => {
            let isSaveSuccessful = this.get('isSaveSuccessful');
            if (isSaveSuccessful) {
                this.set('existingId', this.get('model.id'));
            }
        });
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
                let simulatedError = this.get('simulatedError');
                if (!Ember.isNone(simulatedError)) {
                    throw new Error(simulatedError);
                } else {
                    this.set('isSaveSuccessful', true);
                }
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
                Ember.$(this).remove();
            });
        }
    }
});
