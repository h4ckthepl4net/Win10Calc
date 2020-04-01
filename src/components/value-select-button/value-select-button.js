import BaseComponent from '/components/base-component/base-component.js';

/**
 * @memberof module:Components
 * @class
 * @summary Class for 'value-select-button' custom element.
 * @classdesc Class for 'value-select-button' custom element.
 * 'value-select-button' is used to select one value from a list.
 * When it's inner button is clicked 'value-select-button' changes
 * selected value to next value in array which is specified in
 * value-list attribute. To see all non-overriden static
 * properties and methods see {@link BaseComponent}
 * @extends BaseComponent
 */
class ValueSelectButton extends BaseComponent {

    /**
     * @override
     * @see BaseComponent.___selector
     * @default 'value-select-button'
     */
    static ___selector = 'value-select-button';

    /**
     * @override
     * @see BaseComponent.___templatePath
     * @default '/components/value-select-button/value-select-button.html'
     */
    static ___templatePath = '/components/value-select-button/value-select-button.html';

    /**
     * @override
     * @see BaseComponent.___stylesheets
     * @default ['/css/common.css','/components/value-select-button/value-select-button.css']
     */
    static ___stylesheets = ['/css/common.css', '/components/value-select-button/value-select-button.css'];
    
    /**
     * @override
     * @see BaseComponent.___attributes
     * @default ['value','value-list']
     */
    static ___attributes = ['value', 'value-list'];

    /**
     * @memberof ValueSelectButton
     * @description Keeps the value of value select button and
     * the value of 'value' attribute.
     * @private
     * @type {any}
     * @default null
     */
    #_value = null;
    /**
     * @memberof ValueSelectButton
     * @description Keeps the value of value-select-button and
     * the value of 'value' attribute.
     * @public
     * @type {any}
     * @default null
     */
    get value() {
        return this.#_value;
    }
    set value(val) {
        if(this.#_value != val) {
            this.#_value = val;
            if(val) {
                this.setAttribute('value', '');
            } else {
                this.removeAttribute('value');
            }
        }
    }

    /**
     * @memberof ValueSelectButton
     * @summary List of values for value-select-button.
     * @description Keeps the list of values for value-select-button
     * as array, which is used to iterate over list when the inner
     * button is clicked.
     * @private
     * @type {Array<any>}
     * @default []
     */
    #_valueList = null;
    /**
     * @memberof ValueSelectButton
     * @summary List of values for value-select-button.
     * @description Keeps the list of values for value-select-button
     * as array, which is used to iterate over list when the inner
     * button is clicked.
     * @public
     * @type {Array<any>}
     * @default []
     */
    get valueList() {
        return this.#_valueList;
    }
    set valueList(val) {
        this.setValueList(val, true);
    }

    /**
     * @override
     */
    attributeChangedCallback(attrName, oldVal, newVal) {
        if(attrName == 'value') {
            this.value = newVal;
        } else if (attrName == 'value-list') {
            this.valueList = newVal;
        }
    }

    /**
     * @override
     * @description Initializes click event handler for button with
     * class 'value-select-button' which is in shadow DOM. If button
     * is clicked handler changes the state of value-select-button and
     * triggers a valueChanged event on value-select-button custom
     * element emmiting current value of the button.
     */
    initEventHandlers() {
        this.___shadow.querySelector('.value-select-button').addEventListener('click', () => {
            this.toggled = !this.toggled;
            this.dispatchEvent(new CustomEvent('valueChange', {
                detail: {
                    value: this.value
                }
            }));
        })
    }

    /**
     * @memberof ValueSelectButton
     * @method
     * @description Initializes template of current custom element by assigning
     * the value of {@link BaseComponent.___template} to innerHTML property of
     * {@link BaseComponent#___mainContainer}
     * @public
     * @instance
     * @param {Array<any>} valueList
     * @param {boolean} [resetValue = true]
     * @returns {void}
     */
    setValueList(valueList, resetValue = true) {

    }
}

export {ValueSelectButton as default}