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
        height: calc(100% - 1rem);
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
    <div slot="chart" class="chart">
        <canvas style="height: 100%;"></canvas>
    </div>
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
        const result = (new Function(this.editedSourceCode))();
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