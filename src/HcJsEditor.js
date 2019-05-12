const template = document.createElement('template');
template.innerHTML = `
    <style>
    :host {
    	display: block;
    }
    textarea {
        width: 100%;
        height: 100%;
        margin: 0;
        font-family: monospace;
        border: 0;
        background: inherit;
        font-size: inherit;;
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
        this.setSourceCode(this.innerHTML);
        this.setAttribute('sourceCode', this.$editor.value);
        this.$editor.addEventListener('keyup', (e) => {
            this.setAttribute('sourceCode', this.$editor.value);
            this._dispatchChangeEvent();
            e.stopPropagation();
        });
        // Stop propogation, so no other website functions (like a menu, etc.) are triggered while editing.
        this.$editor.addEventListener('keydown', (e) => {
            e.stopPropagation();
        });
    }
    setSourceCode(sourceCode) {
        this._setSourceCode(sourceCode);
    }
    _setSourceCode(sourceCode) {
        this.$editor.value = this._ensureCharsAreNotHtmlEncoded(sourceCode);
        this._dispatchChangeEvent();
    }
    _dispatchChangeEvent() {
        const eventType = 'change';
        const event = new CustomEvent(eventType, {detail: {type: eventType, sourceCode: this.$editor.value}});
        this.dispatchEvent(event)
    }
    _ensureCharsAreNotHtmlEncoded(html) {
        const doc = document.createElement('pre');
        doc.innerHTML = html;
        return doc.innerText;
    }
}

customElements.define('hc-js-editor', HcJsEditor);