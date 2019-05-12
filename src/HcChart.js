const template = document.createElement('template');
template.innerHTML = `
    <style>
    :host {
    	display: block;
    }
    </style>
    <canvas style="height: 100%; width: 100%;"></canvas>
`;

const chartColors = (bars = 0) => {
    const colors = Object.values({
        hcblue: 'rgba(0, 88, 163, 1.000)',
        hcyellow: 'rgba(251, 215, 58, 1.000)',
        hcfishorange: 'rgba(255, 88, 0, 1.000)',
        hcdarkblue: 'rgba(2, 57, 103, 1.000)',
        hcawardblue: 'rgba(47, 160, 196, 1.000)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
    });
    const numColors = bars === 0 ? colors.length : bars;
    return (new Array(numColors)).fill(0).map((_, idx) => colors[idx % colors.length]);
};

const shortenLabel = _s => {
    const s = String(_s);
    return s.length > 30 ? ('...' + s.substring(s.length-30)) : s;
};

class HcChart extends HTMLElement {
    constructor() {
        super();
        const root = this.attachShadow({mode: 'open'});
        root.appendChild(template.content.cloneNode(true));
    }
    _selectInShadowRoot(selector) {
        return this.shadowRoot && this.shadowRoot.querySelector(selector);
    }
    get $chart() {
        return this._selectInShadowRoot('canvas');
    }
    connectedCallback() {
        Chart.defaults.global.animation.duration = 100;
        Chart.defaults.global.legend.display = false;
        this.createChart();
        this.updateChartData([]);
    }
    disconnectedCallback() {
        this.chart.destroy(); 
    }
    createChart() {
        this.chartData = {datasets: [{backgroundColor: chartColors()}]};
        const defaultXAxesOptions = {
                                ticks: {
                                    beginAtZero: true
                                },
                                minBarLength: 5,
                            };
        this.chart = new Chart(this.$chart, {
            type: 'horizontalBar',
            data: this.chartData,
            options: {
                scales: {
                    yAxes: [Object.assign({}, defaultXAxesOptions)],
                    xAxes: [Object.assign({}, defaultXAxesOptions)],
                }
            }
        });
    }
    
    /**
    *	data: [{value 10, label: "something"}, ...]
    */
    isValidChartData(data) {
        if (!Array.isArray(data)) return false;
        if (data.length === 0) return true;
        const first = data[0];
        if (typeof first !== 'object') return false;
        return 'label' in first && 'value' in first;
    }
    updateChartData(data) {
        const chartable = this.chartData;
        chartable.labels = data.map(({label}) => shortenLabel(label));
        chartable.datasets = [{data: [], backgroundColor: chartColors(data.length)}];
        chartable.datasets[0].data = data.map(d => d.value);
        this.chart.update();
    }
    
    /**
    *	data: [{start: 5, end 10, label: "something"}, ...]
    */
    isValidWaterfallData(data) {
        if (!Array.isArray(data)) return false;
        if (data.length === 0) return true;
        const first = data[0];
        if (typeof first !== 'object') return false;
        return 'label' in first && 'start' in first && 'end' in first;
    }
    updateWaterfallData(data) {
        // Using stacked bar chart for showing this we have to do some calculations for
        // showing the values properly. E.g. a value from 10 to 25 we must pass the data to the 
        // chart as 10 in the first dataset and 15 in the second dataset. The charts render the 
        // relative amount (15), not the absolute number (25).
        // And in the tooltip we have to make sure to calculate back :).
        // The +1 and -1 magic is just so that when start===end a bar is visible.
        this._waterfallOptions();
        const chartable = this.chartData;
        chartable.labels = data.map(s => shortenLabel(s.label));
        chartable.datasets = [{data: [], backgroundColor: 'transparent'}, {data: [], backgroundColor: chartColors(data.length)}];
        chartable.datasets[0].data = data.map(s => s.start);
        chartable.datasets[1].data = data.map(s => s.end + 1 - s.start); // subtract start, since we show stacked values
        this.chart.update();
    }
    _waterfallOptions() {
        const tooltipLabel = ({datasetIndex, index}, {datasets}) => {
            if (datasetIndex === 0) return ''; // no tooltip item
            const start = datasets[0].data[index];
            const end = datasets[1].data[index] + start - 1; // add the start again, since we have stacked values
            return `duration: ${(end - start).toFixed(0)} (${start.toFixed(0)}...${end.toFixed(0)})`;
        };
        
        this.chart.options.scales.yAxes = [{stacked: true}];
        this.chart.options.scales.xAxes = [{stacked: true}];
        this.chart.options.tooltips = {
            callbacks: {
                label: tooltipLabel,
            }
		};
    }
}

customElements.define('hc-chart', HcChart);