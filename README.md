# Create Interface

## Create custom elements for declarative and functional programming

> #### _createInterface_ is a [declarative](https://en.wikipedia.org/wiki/Declarative_programming) method that creates a [custom-element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) without using the [_class_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) syntax.

_createInterface_ is preferred for declarative and [functional programming](https://wiki.haskell.org/Functional_programming#Features_of_functional_languages) paradigm styles. _createInterface_ mimics the mannerism of 
`Object.assign`. It will create a new custom element from a base element whilst inheriting the base element's callback functions. 
There are two way to use _createInterface_.

### Install 
`npm install create-interface` or `yarn add create-interface`

## Create an Autonomous/ Built-in Custom Element from an HTML Interface
```javascript 
import createInterface from 'create-interface';

const newCustomElement = createInterface(
  'new-cusomt-element', 
  HTMLElement, 
  {...callbacks}
);

customElements.define('new-cusomt-element', newCustomElement); 

```
## Extend a Custom Element from a Custom Element 
```javascript 
...

const anotherCustomElement = createInterface(
  'new-cusomt-element',
  newCustomElement,
  {...newCallbacks}
);

customElements.define('another-cusomt-element', anotherCustomElement); 
```

## Lifecycle Callbacks

> The lifecycle callbacks are smilar to native _customElement_ callbacks but with some slight differences:

 ### _adopted(element)_
> **_adopted_**  is the equivalence of [**_adoptedCallback_**](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks) but without context. Instead it provides the active _element_ as an argument.

 ### _attributeChanged(element, name, oldValue, newValue)_
> **_attributeChanged_** is the equivalence of [**_attributeChangedCallback_**](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks) but without context. It provides the following argumetnts respectively: 
> - _element_
> - _name_ 
> - _oldValue_
> - _newValue_


 ### _disconnected(element)_
> **_disconnected_**  is the equivalence of [**_disconnectedCallback_**](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks) but without context. Instead it provides the active _element_ as an argument.

 ### _connected(element)_
> **_connected_**  is the equivalence of [**_connectedCallback_**](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks) but without context. Instead it provides the active _element_ as an argument.

 ### _observedAttributes(element)_
> **_observedAttributes_**  is the equivalence of [**_static get observedAttributes()_**](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks) but without context. It expects an array of attribute names as a return value.

 ## Browser Support
> This method does not provide polyfills. It is intended to support enviroments that support Custom Elements (V1).
Check for native support [here](https://caniuse.com/#feat=custom-elementsv1):

MIT 2019 Julien Etienne
