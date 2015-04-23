import Ember from 'ember';

const requiredFields = ['name', 'email'].map((field) => {
    return `model.${field}`;
});

export default Ember.Controller.extend({
    /**
     * @var {array} List of countries to choose from
     */
    countries: [],

    /**
     * @var {boolean} Whether the model is being persisted right now
     */
    isSaving: false,

    /**
     * @var {boolean} Whether the submit button should be disabled. Based on whether the model is
     *                being persisted and all required fields are filled.
     */
    isSubmitDisabled: Ember.computed(...requiredFields, 'isSaving', function () {
        if (this.get('isSaving')) {
            return true;
        }

        for (let field of requiredFields) {
            if (Ember.isBlank(this.get(field))) {
                return true;
            }
        }

        return false;
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
