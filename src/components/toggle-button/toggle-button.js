import BaseComponent from '/components/base-component/base-component.js';

/**
 * @memberof module:Components
 * @class
 * @summary Class for 'toggle-button' custom element.
 * @classdesc Class for 'toggle-button' custom element.
 * 'toggle-button' custom element is used as checkbox,
 * it toggles it's state when inner button is clicked.
 * To see all non-overriden static properties and methods.
 * see {@link BaseComponent}
 * @extends BaseComponent
 */
class ToggleButton extends BaseComponent {

    /**
     * @override
     * @see BaseComponent.___selector
     * @default 'toggle-button'
     */
    static ___selector = 'toggle-button';

    /**
     * @override
     * @see BaseComponent.___templatePath
     * @default '/components/toggle-button/toggle-button.html'
     */
    static ___templatePath = '/components/toggle-button/toggle-button.html';

    /**
     * @override
     * @see BaseComponent.___stylesheets
     * @default ['/css/common.css','/components/toggle-button/toggle-button.css']
     */
    static ___stylesheets = ['/css/common.css', '/components/toggle-button/toggle-button.css'];
    
    /**
     * @override
     * @see BaseComponent.___attributes
     * @default ['toggled','button-style']
     */
    static ___attributes = ['toggled', 'button-style'];

    /**
     * @memberof ToggleButton
     * @description Keeps the state of toggle button and
     * the value of 'toggled' attribute.
     * @private
     * @type {boolean}
     * @default false
     */
    #_toggled = false;
    /**
     * @memberof ToggleButton
     * * @description Keeps the state of toggle button and
     * the value of 'toggled' attribute.
     * @public
     * @type {boolean}
     * @default false
     */
    get toggled() {
        return this.#_toggled;
    }
    set toggled(val) {
        if(this.#_toggled != val) {
            this.#_toggled = val;
            if(val) {
                this.setAttribute('toggled', '');
            } else {
                this.removeAttribute('toggled');
            }
        }
    }

    /**
     * @memberof ToggleButton
     * @description Specifies the style of toggle button.
     * Also keeps value of 'button-style' attribute
     * @private
     * @type {'underline'|'background'|'none'}
     * @default 'underline'
     */
    #_buttonStyle = 'underline';
    /**
     * @memberof ToggleButton
     * @description Specifies the style of toggle button.
     * Also keeps value of 'button-style' attribute
     * @public
     * @type {'underline'|'background'|'none'}
     * @default 'underline'
     */
    get buttonStyle() {
        return this.#_buttonStyle;
    }
    set buttonStyle(val) {
        if(this.#_buttonStyle != val) {
            if(val == 'background' || val == 'none') {
                this.#_buttonStyle = val;
            } else {
                this.#_buttonStyle = 'underline';
            }
            this.setAttribute('button-style', this.#_buttonStyle);
        }
    }

    /**
     * @override
     */
    attributeChangedCallback(attrName, oldVal, newVal) {
        if(attrName == 'button-style') {
            this.buttonStyle = newVal;
        } else if (attrName == 'toggled') {
            if(oldVal == null) {
                this.toggled = true;
            } else if(newVal == null) {
                this.toggled = false;
            }
        }
    }

    /**
     * @override
     * @description Initializes click event handler for button with
     * class 'toggle-button' which is in shadow DOM. If button is
     * clicked handler toggles state of toggle-button and triggers
     * a toggle event on toggle-button custom element emmiting current
     * state of the button.
     */
    initEventHandlers() {
        this.___shadow.querySelector('.toggle-button').addEventListener('click', () => {
            this.toggled = !this.toggled;
            this.dispatchEvent(new CustomEvent('toggle', {
                detail: {
                    toggled: this.toggled
                }
            }));
        })
    }

}

export {ToggleButton as default};