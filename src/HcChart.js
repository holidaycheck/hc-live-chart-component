const template = document.createElement('template');
template.innerHTML = `
    <style>
    :host {
    	display: block;
    }
    </style>
    <canvas style="height: 100%; width: 100%;"></canvas>
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
    createChart() {
        this.chartData = {datasets: [{backgroundColor: chartColors}]};
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
                        ticks: {
                            beginAtZero: true
                        },
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
    
    /**
    *	data: [{value 10, label: "something"}, ...]
    */
    updateChartData(data) {
        const chartable = this.chartData;
        chartable.labels = data.map(({label}) => label.length > 30 ? ('...' + label.substring(label.length-30)) : label);
        //chartable.datasets[0].label = '# ???';
        chartable.datasets[0].data = data.map(d => d.value);
        this.chart.update();
    }
    
    /**
    *	data: [{start: 5, end 10, label: "something"}, ...]
    */
    updateWaterfallData(data) {
        // Using stacked bar chart for showing this we have to do some calculations for
        // showing the values properly. E.g. a value from 10 to 25 we must pass the data to the 
        // chart as 10 in the first dataset and 15 in the second dataset. The charts render the 
        // relative amount (15), not the absolute number (25).
        // And in the tooltip we have to make sure to calculate back :).
        // The +1 and -1 magic is just so that when start===end a bar is visible.
        this._waterfallOptions();
        const chartable = this.chartData;
        chartable.labels = data.map(s => s.label);
        chartable.datasets = [{data: [], backgroundColor: 'transparent'}, {data: [], backgroundColor: chartColors}];
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