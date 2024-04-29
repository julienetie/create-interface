import createInterface from './create-interface.js'
import { expect } from './node_modules/chai/chai.js'

describe('createInterface', () => {
    /** 
     * Removes all elements added to the body
     */
    afterEach(() => [
            ...document
            .body
            .children
        ]
        .slice(1)
        .forEach(element => element.remove())
    )


    it('Should create a custom element from a name and HTML interface', () => {
        const testElement = createInterface('test-element', HTMLElement)
        expect(testElement.prototype instanceof HTMLElement).to.be.true
    })


    it('Should create a definable element', (done) => {
        const name = 'define-element'
        const defineElement = createInterface(name, HTMLCanvasElement)
        customElements.define(name, defineElement)
        customElements.whenDefined(name).then(()=>{
            done()
        })
        
    })


    it('Should call the given connected callback passing the connected element parameter', (done) => {
        const name = 'test-connected'
        const connected = element => {
            expect(element instanceof Element).to.be.true
            done()
        }
        const test = createInterface(name, HTMLElement, {
            connected
        })
        customElements.define(name, test)
        document.body.insertAdjacentHTML('beforeend', `<${name}></${name}>`)
    })


    it('Should call the given disconnected callback passing with the disconnected element parameter', (done) => {
        const name = 'test-disconnected'
        const disconnected = element => {
            expect(element instanceof Element).to.be.true
            done()
        }
        const test = createInterface(name, HTMLElement, {
            disconnected
        })
        customElements.define(name, test)
        document.body.insertAdjacentHTML('beforeend', `<${name}></${name}>`)
        const testDisconnected = document.querySelector(name)
        testDisconnected.remove()
    })


    it('Should call the given adopted callback passing with the adopted element parameter', (done) => {
        const name = 'test-adopted'
        const iframe = document.createElement('iframe')
        document.body.appendChild(iframe)
        const adopted = element => {
            expect(element instanceof Element).to.be.true
            done()
        }
        const test = createInterface(name, HTMLElement, {
            adopted
        })
        customElements.define(name, test)
        document.body.insertAdjacentHTML('beforeend', `<${name}></${name}>`)
        const testAdopted = document.querySelector(name)
        iframe.contentWindow.document.adoptNode(testAdopted)
    })


    it('Should call the given attributeChanged callback passing the element and default attributeChangedCallback parameters', (done) => {
        const name = 'test-attribute-changed'
        const observedAttributes = () => (['some-attribute'])
        let count = 0
        const attributeChanged = (element, name, oldValue, newValue) => {
            count++
            if (count === 2) {
                expect(element instanceof Element).to.be.true
                expect(name).to.equal('some-attribute')
                expect(oldValue).to.equal('321')
                expect(newValue).to.equal('123')
                done()
            }
        }
        const test = createInterface(name, HTMLElement, {
            attributeChanged,
            observedAttributes
        })
        customElements.define(name, test)
        document.body.insertAdjacentHTML('beforeend', `<${name}  some-attribute="321" ></${name}>`)
        const testattributeChanged = document.querySelector(name)
        testattributeChanged.setAttribute('some-attribute', 123)
    })


    it('Should create a custom element from an existing custom-element', () => {
        const customElement = createInterface('custom-element', HTMLElement)
        const testElement = createInterface('extended-custom-element', customElement)
        expect(testElement.prototype instanceof customElement).to.be.true
    })


    it('Should create a definable extended element', (done) => {
        const name = 'extended-element'
        const customElement = createInterface('custom-element', HTMLElement)
        const element = createInterface(name, customElement)
        customElements.define(name, element)
        customElements.whenDefined(name).then(()=>{
            done()
        })
    })


    it('Should create an extended element with inherited callbacks', (done) => {
        const sequence = ["observedAttributes", "attributeChanged", "connected", "attributeChanged", "disconnected", "adopted"]
        const name = 'custom-element-two'
        const extendedCallbacks = []
        const connected = element => {
            extendedCallbacks.push(connected.name)
        }
        const adopted = element => {
            extendedCallbacks.push(adopted.name)
            console.log('extendedCallbacks', extendedCallbacks)
            if(extendedCallbacks.every((callback, i) => callback === sequence[i]))
                done()
        }

        const observedAttributes = () => {
            extendedCallbacks.push(observedAttributes.name)
            return ['some-attribute']
        }
        const attributeChanged = (element, name, oldValue, newValue) => {
            extendedCallbacks.push(attributeChanged.name)
            expect(element instanceof Element).to.be.true
            expect(name).to.equal('some-attribute')
            console.log(oldValue)
            if(oldValue){
                expect(oldValue).to.equal('321')
                expect(newValue).to.equal('Universe')
            }
        }
        const disconnected = element => {
            extendedCallbacks.push(disconnected.name)
        }
        const customElement = createInterface(name, HTMLElement, {
            attributeChanged,
            observedAttributes,
            connected,
            adopted,
            disconnected
        })
        const extendedName = 'extended-element-two'
        const extendedElement = createInterface(extendedName, customElement)
        customElements.define(extendedName, extendedElement)
        const iframe = document.createElement('iframe')
        document.body.appendChild(iframe)
        document.body.insertAdjacentHTML('beforeend', `<${extendedName}  some-attribute="321" ></${extendedName}>`)
        const extendedElementTwo = document.querySelector(extendedName)
        extendedElementTwo.setAttribute('some-attribute', "Universe")
        iframe.contentWindow.document.adoptNode(extendedElementTwo)
    })


    it('Should create an extended element with provided callbacks', (done) => {
        const sequence = ["observedAttributes", "attributeChanged", "connected", "attributeChanged", "disconnected", "adopted"]
        const name = 'custom-element-three'
        const extendedCallbacks = []
        const connected = element => {
            extendedCallbacks.push(connected.name)
        }
        const adopted = element => {
            extendedCallbacks.push(adopted.name)
            console.log('extendedCallbacks', extendedCallbacks)
            if(extendedCallbacks.every((callback, i) => callback === sequence[i]))
                done()
        }

        const observedAttributes = () => {
            extendedCallbacks.push(observedAttributes.name)
            return ['some-attribute']
        }
        const attributeChanged = (element, name, oldValue, newValue) => {
            extendedCallbacks.push(attributeChanged.name)
            expect(element instanceof Element).to.be.true
            expect(name).to.equal('some-attribute')
            console.log(oldValue)
            if(oldValue){
                expect(oldValue).to.equal('321')
                expect(newValue).to.equal('Universe')
            }
        }
        const disconnected = element => {
            extendedCallbacks.push(disconnected.name)
        }
        const customElement = createInterface(name, HTMLElement)
        const extendedName = 'extended-element-three'
        const extendedElement = createInterface(extendedName, customElement,{
            attributeChanged,
            observedAttributes,
            connected,
            adopted,
            disconnected
        })
        customElements.define(extendedName, extendedElement)
        const iframe = document.createElement('iframe')
        document.body.appendChild(iframe)
        document.body.insertAdjacentHTML('beforeend', `<${extendedName}  some-attribute="321" ></${extendedName}>`)
        const extendedElementTwo = document.querySelector(extendedName)
        extendedElementTwo.setAttribute('some-attribute', "Universe")
        iframe.contentWindow.document.adoptNode(extendedElementTwo)
    })
})