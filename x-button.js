const template = `
  <button id="button">Hallo</button>
  <style media="screen">
    /* Adding some color to our custom button to see if css scoping is working */
    button {
      color:red;
    }
  </style>
`

class xButton extends HTMLElement {
  constructor () {
    super()

    // Set up shadow dom
    this.shadow = this.attachShadow({mode: 'open'})
    this.shadow.innerHTML = template

    // defining self to call "this" from anonymous functions
    var self = this;
    //register click event
    this.shadow.querySelector('button').onclick = function(){
      alert(self.message);
    }
  }

  // Watched attributes
  static get observedAttributes() { return ['message'] }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr == 'message') {
      this.message = newValue;
      this.shadow.querySelector('#button').innerHTML = 'Say: ' + this.message;
    }
  }
}

// register element
customElements.define('x-button', xButton);
