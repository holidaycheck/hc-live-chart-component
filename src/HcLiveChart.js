import './HcChart.js';
import './HcJsEditor.js';

const template = document.createElement('template');
template.innerHTML = `
    <style>
    :host {
		--margin: 0.5rem;
        display: flex;
        height: auto;
        width: auto;
        justify-content: center;
        overflow: hidden;
    }
    hc-js-editor {
        flex: 1;
        width: auto;
        height: auto;
    }
    hc-chart {
        flex: 1;
    }
    .jsError {
    	position: absolute;
    	margin-top: calc(-1.3rem - 2 * var(--margin));
    	right: 50%;
    	background: rgba(255,0,0,0.7);
    	color: white;
    	padding: var(--margin);
    }
    .hidden {
    	display: none;
    }
    
    </style>

    <hc-js-editor></hc-js-editor>
	<hc-chart style="height: 100%;"></hc-chart>
	<div class="jsError hidden"></div>
`;

class HcLiveChart extends HTMLElement {
    constructor() {
        super();
        const root = this.attachShadow({mode: 'open'});
        root.appendChild(template.content.cloneNode(true));
    }
    _selectInShadowRoot(selector) {
        return this.shadowRoot && this.shadowRoot.querySelector(selector);
    }
    get $jsEditor() {
        return this._selectInShadowRoot('hc-js-editor');
    }
    get $chart() {
        return this._selectInShadowRoot('hc-chart');
    }
    get $jsError() {
        return this._selectInShadowRoot('.jsError');
    }
    
    connectedCallback() {
        this._connectAllEvents();
        this.$jsEditor.setSourceCode(this.innerHTML);
    }
    disconnectedCallback() {
        this._disconnectAllEvents();
    }
    _defineEventHandlerFunctions() {
        this._editorChangeFn = ({detail}) => { this.evaluateAndRerenderChart(detail.sourceCode); };
    }
    _connectAllEvents() {
        this._defineEventHandlerFunctions();
        this.$jsEditor.addEventListener('change', this._editorChangeFn);
    }    
    _disconnectAllEvents() {
        this.$jsEditor.removeEventListener('change', this._editorChangeFn);
    }
    
    evaluateAndRerenderChart(editedSourceCode) {
    	let result;
    	try {
	        result = (new Function(editedSourceCode))();
    	} catch (e) {
    		this.$jsError.innerHTML = e;
	        this.$jsError.classList.remove('hidden');
	        return;
    	}
		this.$jsError.innerHTML = "";
		this.$jsError.classList.add('hidden');
        this.updateChartData(result);
    }
    updateChartData(data) {
        if (this.$chart.isValidWaterfallData(data)) {
            this.$chart.updateWaterfallData(data);
        } else if (this.$chart.isValidChartData(data)) {
            this.$chart.updateChartData(data);
        } else {
            this.$jsError.innerHTML = 'The data should be either [{label: "xxxx", value: 42}, ...] or [{label: "xxxx", start: 23, end: 23}, ...]';
            this.$jsError.classList.remove('hidden');
        }
    }
}

customElements.define('hc-live-chart', HcLiveChart);