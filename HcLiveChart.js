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
        <canvas style="height: 100%;"></canvas>
    </div>
	<div class="jsError hidden"></div>
`;

const chartColors = Object.values({
	hcblue: 'rgba(0, 88, 163, 1.000)',
	hcyellow: 'rgba(251, 215, 58, 1.000)',
	hcfishorange: 'rgba(255, 88, 0, 1.000)',
	hcdarkblue: 'rgba(2, 57, 103, 1.000)',
	hcawardblue: 'rgba(47, 160, 196, 1.000)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
});

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
        return this._selectInShadowRoot('canvas');
    }
    get $jsError() {
        return this._selectInShadowRoot('.jsError');
    }
    get editedSourceCode() {
        return this.$sourceCode.value;
    }
    connectedCallback() {
        Chart.defaults.global.animation.duration = 100;
        this.createChart();
        this.evaluateAndRerenderChart();
        this.$sourceCode.addEventListener('keyup', () => {
            this.evaluateAndRerenderChart();
        });
    }
    createChart() {
        this.chartData = {labels: [], datasets: [{backgroundColor: chartColors}]};
        this.chart = new Chart(this.$chart, {
            type: 'horizontalBar',
            data: this.chartData,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                    }],
                    xAxes: [{
                        barPercentage: 0.5,
                        barThickness: 6,
                        maxBarThickness: 8,
                        minBarLength: 2,
                        gridLines: {
                            offsetGridLines: true
                        },
                    }]
                }
            }
        });
    }
    evaluateAndRerenderChart() {
    	let result;
    	try {
	        result = (new Function(this.editedSourceCode))();
	        this.$jsError.innerHTML = "";
	        this.$jsError.classList.add('hidden');
    	} catch (e) {
    		this.$jsError.innerHTML = e;
	        this.$jsError.classList.remove('hidden');
    	}
        this.updateChartData(result);
    }
    updateChartData(data) {
        const chartable = this.chartData;
        chartable.labels = data.map(({key}) => key.length > 30 ? ('...' + key.substring(key.length-30)) : key);
        //chartable.datasets[0].label = '# ???';
        chartable.datasets[0].data = data.map(d => d.value);
        this.chart.update();
    }
}

customElements.define('hc-live-chart', HcLiveChart);