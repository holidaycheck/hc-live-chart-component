const template = document.createElement('template');
template.innerHTML = `
    <style>
    :host {
    	display: block;
    }
    </style>
    <textarea></textarea>
`;

class HcJsEditor extends HTMLElement {
    static get observedAttributes() {
      return ['sourceCode']; 
    }
    constructor() {
        super();
        const root = this.attachShadow({mode: 'open'});
        root.appendChild(template.content.cloneNode(true));
    }
    _selectInShadowRoot(selector) {
        return this.shadowRoot && this.shadowRoot.querySelector(selector);
    }
    get $editor() {
        return this._selectInShadowRoot('textarea');
    }
    connectedCallback() {
        this.$editor.value = this.innerHTML;
        this.setAttribute('sourceCode', this.$editor.value);
        this.$editor.addEventListener('keyup', () => {
            this.setAttribute('sourceCode', this.$editor.value);
        });
    }
}

customElements.define('hc-js-editor', HcJsEditor);