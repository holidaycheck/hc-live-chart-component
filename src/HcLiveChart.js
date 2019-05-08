import './HcChart.js';

const template = document.createElement('template');
template.innerHTML = `
    <style>
    :host {
		--margin: 0.5rem;
        display: flex;
        height: auto;
        width: auto;
        justify-content: center;
    }
    slot[name=sourceCode] {
        display: block;
        flex: 1;
        border: 1px solid black;
    }
    ::slotted(textarea) {
        font-family: monospace;
        font-size: 1.2rem;
        width: calc(100% - 2 * var(--margin));
        height: calc(100% - 2 * var(--margin));
        padding: var(--margin);
        margin: 0;
        border: 0;
        outline: none;
    }
    .chart {
        flex: 1;
        border: 1px solid black;
    }
    .jsError {
    	position: absolute;
    	margin-top: calc(-1rem - var(--margin));
    	right: 50%;
    	background: rgba(255,0,0,0.7);
    	color: white;
    	padding: var(--margin);
    }
    .hidden {
    	display: none;
    }
    
    </style>

    <slot name="sourceCode"></slot>
    <div slot="chart" class="chart">
        <hc-chart style="height: 100%;"></hc-chart>
    </div>
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
    get $sourceCode() {
        const slot = this._selectInShadowRoot('slot[name=sourceCode]');
        return slot.assignedNodes()[0];
    }
    get $chart() {
        return this._selectInShadowRoot('hc-chart');
    }
    get $jsError() {
        return this._selectInShadowRoot('.jsError');
    }
    get editedSourceCode() {
        return this.$sourceCode.value;
    }
    connectedCallback() {
        this.evaluateAndRerenderChart();
        this.$sourceCode.addEventListener('keyup', () => {
            this.evaluateAndRerenderChart();
        });
    }
    evaluateAndRerenderChart() {
    	let result;
    	try {
	        result = (new Function(this.editedSourceCode))();
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
        this.$chart.updateChartData(data);
    }
}

customElements.define('hc-live-chart', HcLiveChart);