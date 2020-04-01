
/**
 * @memberof module:Components
 * @class
 * @classdesc Base class for all custom elements.
 * Contains all common members and methods that every custom element must have.
 * @abstract
 * @extends HTMLElement
 */
class BaseComponent extends HTMLElement {
    
    /**
     * @memberof BaseComponent
     * @description The selector that current custom element is registered with.
     * @abstract
     * @protected
     * @static
     * @readonly
     * @type {string}
     * @default 'base-component'
     */
    static ___selector = 'base-component';

    /**
     * @memberof BaseComponent
     * @description Path that is used to dynamically load HTML template from server.
     * @abstract
     * @protected
     * @static
     * @readonly
     * @type {string}
     * @default null
     */
    static ___templatePath = null;

    /**
     * @memberof BaseComponent
     * @description Stylesheet paths that are included and used in current custom element.
     * @protected
     * @static
     * @readonly
     * @type {Array<string>}
     * @default []
     */
    static ___stylesheets = [];

    /**
     * @memberof BaseComponent
     * @description Attributes whose changes the current custom element is listening.
     * @protected
     * @static
     * @readonly
     * @type {Array<string>}
     * @default []
     */
    static ___attributes = [];

    /**
     * @memberof BaseComponent
     * @description Request object that is sent to get template for current custom element type.
     * @protected
     * @static
     * @type {JQueryXHR}
     * @default null
     */
    static ___templateRequest = null;

    /**
     * @memberof BaseComponent
     * @description Template for current custom element type that is loaded from server.
     * @protected
     * @static
     * @type {string}
     * @default null
     */
    static ___template = null;

    /**
     * @memberof BaseComponent
     * @method
     * @description Defines current custom element in customElements registry.
     * @public
     * @static
     * @returns {void}
     */
    static defineElement() {
        window.customElements.define(this.___selector, this);
    }
    
    /**
     * @memberof BaseComponent
     * @method
     * @summary Loads template for current custom element
     * @description Sends a GET request to load the template of
     * current custom element and returns request object,
     * or returns it immediately if GET request is already sent.
     * @public
     * @static
     * @returns {JQueryXHR}
     */
    static loadTemplate() {
        if(this.___templateRequest) {
            return this.___templateRequest;
        }
        return (this.___templateRequest = $.get({
            url: this.___templatePath,
            success: (htmlTemplate) => {
                this.___template = htmlTemplate;
            }
        }));
    }

    /**
     * @memberof BaseComponent
     * @summary Part of custom elements browser API.
     * Array of observed attribute names.
     * @description A getter for {@link BaseComponent.___attributes}.
     * This getter is used by browser to get attributes whose changes it must listen.
     * @public
     * @static
     * @readonly
     * @returns {Array<string>}
     */
    static get observedAttributes() {
        return this.___attributes;
    }

    /**
     * @memberof BaseComponent
     * @description Reference to shadow DOM root of current custom element.
     * @protected
     * @instance
     * @type {ShadowRoot}
     * @default null
     */
    ___shadow = null;

    /**
     * @memberof BaseComponent
     * @summary Reference to main container.
     * @description Reference to div element which exists in every
     * custom element derived from {@link BaseComponent} and from now on
     * is called main container. Its id and class attributes are initially
     * equal to "main-container". Main container is added to shadow DOM root of
     * current custom element by constructor of {@link BaseComponent}.
     * @protected
     * @instance
     * @type {HTMLDivElement}
     * @default null
     */
    ___mainContainer = null;

    /**
     * @summary Constructs an object of type {@link BaseComponent} and
     * does all operations that are common for 
     * custom elements that extend {@link BaseComponent}.
     * @description Constructs an object of type {@link BaseComponent},
     * attaches shadow DOM to current node,
     * initializes common template in shadow DOM (See {@link BaseComponent#initBaseTemplate}),
     * initializes the template (See {@link BaseComponent#initLoadedTemplate}) and
     * all event handlers (See {@link BaseComponent#initEventHandlers}) of
     * current custom element if its template is already loaded, otherwise
     * does so after loading the template of current custom element.
     * @constructor
     */
    constructor() {
        super();
        this.___shadow = this.attachShadow({mode: 'closed'});
        this.initBaseTemplate();
        /**
         * Type of current object
         * Used to access static members and methods
         * @type {BaseComponent}
         */
        let typeOfThis = this.constructor;
        if(!typeOfThis.___template) {
            typeOfThis.loadTemplate().done(() => {
                this.initLoadedTemplate();
                this.initEventHandlers();
            });
        } else {
            this.initLoadedTemplate();
            this.initEventHandlers();
        }
    }

    /**
     * @memberof BaseComponent
     * @method
     * @summary Part of custom elements browser API.
     * Callback for element's connection to DOM.
     * @description One of browser custom element lifecycle callbacks.
     * A method is called by browser every time current custom element
     * is connected to DOM. Used by custom element to respectively react
     * to DOM connection. Method may be called once current custom element
     * is no longer connected, use Node.isConnected to make sure.
     * @public
     * @instance
     * @returns {void}
     */
    connectedCallback() {}

    /**
     * @memberof BaseComponent
     * @method
     * @summary Part of custom elements browser API.
     * Callback for element's disconnection from DOM.
     * @description One of browser custom element lifecycle callbacks.
     * A method is called by browser every time current custom element
     * is disconnected from document's DOM. Used by custom element to
     * respectively react to disconnection from DOM.
     * @public
     * @instance
     * @returns {void}
     */
    disconnectedCallback() {}

    /**
     * @memberof BaseComponent
     * @method
     * @summary Part of custom elements browser API.
     * Callback for document change observation.
     * @description One of browser custom element lifecycle callbacks.
     * A method is called by browser every time element is moved from
     * one document to another. Used by custom element to respectively
     * react to element moved.
     * @public
     * @instance
     * @returns {void}
     */
    adoptedCallback() {}

    /**
     * @memberof BaseComponent
     * @method
     * @summary Part of custom elements browser API.
     * Callback for attribute changes observation.
     * @description One of browser custom element lifecycle callbacks.
     * A method is called by browser every time an attribute change occurs.
     * Used by custom element to respectively react to attribute changes.
     * @public
     * @instance
     * @param {string} attrName
     * @param {string|null} oldVal
     * @param {string|null} newVal
     * @returns {void}
     */
    attributeChangedCallback(attrName, oldVal, newVal) {}

    /**
     * @memberof BaseComponent
     * @method
     * @summary Initializes base template which is common for
     * every custom element derived from {@link BaseComponent}.
     * @description Initializes base template by creating
     * `<link rel="stylesheet" href="STYLESHEET_PATH">` tags for each
     * path specified in {@link BaseComponent.___stylesheets} array,
     * where STYLESHEET_PATH is string equal to consecutive
     * stylesheet path from {@link BaseComponent.___stylesheets} array.
     * After which creates DIV element sets its id and class attribute to
     * "main-container" and assignes its reference to {@link BaseComponent#___mainContainer}.
     * @public
     * @instance
     * @returns {void}
     */
    initBaseTemplate() {
        /**
         * Type of current object
         * Used to access static members and methods
         * @type {BaseComponent}
         */
        let typeOfThis = this.constructor;
        for(let i = 0; i < typeOfThis.___stylesheets.length; i++) {
            let stylesheet = document.createElement('link');
            stylesheet.rel = 'stylesheet';
            stylesheet.href = typeOfThis.___stylesheets[i];
            this.___shadow.appendChild(stylesheet);
        }
        this.___mainContainer = document.createElement('div');
        this.___mainContainer.id = 'main-container';
        this.___mainContainer.classList.add('main-container');
        this.___shadow.appendChild(this.___mainContainer);
    }

    /**
     * @memberof BaseComponent
     * @method
     * @description Initializes template of current custom element by assigning
     * the value of {@link BaseComponent.___template} to innerHTML property of
     * {@link BaseComponent#___mainContainer}
     * @public
     * @instance
     * @returns {void}
     */
    initLoadedTemplate() {
        /**
         * Type of current object
         * Used to access static members and methods
         * @type {BaseComponent}
         */
        let typeOfThis = this.constructor;
        this.___mainContainer.innerHTML = typeOfThis.___template;
    }

    /**
     * @memberof BaseComponent
     * @method
     * @description Used to initialize event handlers of current custom element.
     * If derived custom element wants to add event handlers it must override
     * this method.
     * @public
     * @instance
     * @abstract
     * @returns {void}
     */
    initEventHandlers() {}
}

export {BaseComponent as default}