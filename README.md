# Create Interface
## Create custom elements for declarative and functional programming

> _createInterface_ is a declarative method that creates a custom-element without using the _class_ syntax.

> _createInterface_ is preferred for declarative and functional programming paradigm styles. _createInterface_ inherits in the mannerism of 
`Object.assign`. It will create a new custom element from a base element whilst inheriting the base element's callback functions. 
There are two way to use _createInterface_.

#### Create an autonomous/ built-in Custom Element from an HTML interface
```javascript 
import createInterface from 'create-interface';

const newCustomElement = createInterface(
  'new-cusomt-element', 
  HTMLElement, 
  {...callbacks}
);

customElements.define('new-cusomt-element', newCustomElement); 

```
#### Extend a Custom Element from a Custom Element 
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

 ### adopted(element)
> **_adopted_**  is the equivalence of **_adoptedCallback_** but without context. Instead it provides the active _element_ as an argument.

 ### attributeChanged(element)
> **_attributeChanged_** is the equivalence of **_attributeChangedCallback_** but without context. It provides the following argumetnts respectively: 
> - _element_
> - _name_ 
> - _oldValue_
> - _newValue_


 ### disconnected(element)
> **_disconnected_**  is the equivalence of **_disconnectedCallback_** but without context. Instead it provides the active _element_ as an argument.

 ### connected(element)
> **_connected_**  is the equivalence of **_connectedCallback_** but without context. Instead it provides the active _element_ as an argument.

 ### observedAttributes(element)
> **_observedAttributes_**  is the equivalence of **_static get observedAttributes()_** but without context. It expects an array of attribute names as a return value.

 ### Browser Support
> This method does not provide polyfills. It is intended to support enviroments that support Custom Elements (V1).
Check for native support [here](https://caniuse.com/#feat=custom-elementsv1):

MIT 2019 Julien Etienne
