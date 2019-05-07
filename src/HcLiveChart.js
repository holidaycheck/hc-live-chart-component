const template = document.createElement('template');
template.innerHTML = `
    <style>
    :host {
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
        width: calc(100% - 1rem);
        padding: 0.5rem;
        margin: 0;
        border: 0;
        outline: none;
    }
    .chart {
        flex: 1;
        border: 1px solid black;
    }
    
    </style>

    <slot name="sourceCode"></slot>
    <div slot="chart" class="chart">the chart</div>
`;

let lastQuestion = '';
let numberOfAnswersLoaded = 0;

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
        return this._selectInShadowRoot('[slot=chart]');
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
        const result = (new Function(this.editedSourceCode))();
        this.$chart.innerHTML = JSON.stringify(result);
    }
}

customElements.define('hc-live-chart', HcLiveChart);