/** 
 * Extends a built-in interface. 
 * Similar to class someElement extends HTMLElement {}
 * 
 * @param {string} name
 * @param {Object} newTarget - The target to create an instance from.
 * @param {Object} callbacks - An object literal of declarative callback. 
 *  relative to the standard Custom Elements specification.
 */
export default (name, newTarget, callbacks = {}) => {
    const {
        attributeChanged,
        connected,
        disconnected,
        adopted,
        observedAttributes
    } = callbacks;

    // A dynamically named function to reference it's self.
    const customFn = {
        [name]: function() {
            const target = newTarget.prototype.constructor;
            return Reflect.construct(target, [], customFn[name]);
        }
    };

    // Copy the prototype of the newTarget and assign to the new custom element.
    const customElement = customFn[name];
    customElement.prototype = Object.create(newTarget.prototype);

    /**
     * Declarative attributeChangedCallback.
     */
    if (attributeChanged) {
        customElement.prototype.attributeChangedCallback = function(attr, oldValue, newValue) {
            if (typeof attributeChanged === 'function')
                attributeChanged(this, attr, oldValue, newValue);
        }
    }

    /**
     * Declarative connectedCallback.
     */
    if (connected)
        customElement.prototype.connectedCallback = function() { connected(this); };

    /** 
     * Declarative disconnectedCallback.
     */
    if (disconnected)
        customElement.prototype.disconnectedCallback = function() { disconnected(this); };

    /**
     * Declarative adoptedCallback.
     */
    if (adopted)
        customElement.prototype.adoptedCallback = function() { adopted(this); };

    /**
     * Declarative observedAttributes.
     */
    Object.defineProperty(customElement, 'observedAttributes', {
        get: () => observedAttributes ? observedAttributes() : newTarget.observedAttributes
    });
    return customElement;
}