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
        padding: 0;
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
        this.$editor.addEventListener('keyup', () => {
            this.setAttribute('sourceCode', this.$editor.value);
            const eventType = 'change';
            const event = new CustomEvent(eventType, {detail: {type: eventType, sourceCode: this.$editor.value}});
            this.dispatchEvent(event)
        });
    }
    setSourceCode(sourceCode) {
        this._setSourceCode(sourceCode);
    }
    _setSourceCode(sourceCode) {
        this.$editor.value = this._ensureCharsAreNotHtmlEncoded(sourceCode);
    }
    _ensureCharsAreNotHtmlEncoded(html) {
        const doc = document.createElement('pre');
        doc.innerHTML = html;
        return doc.innerText;
    }
}

customElements.define('hc-js-editor', HcJsEditor);