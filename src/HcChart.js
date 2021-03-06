import {dataToChartable} from './stacked-waterfall.js';

const template = document.createElement('template');
template.innerHTML = `
    <style>
    :host {
    	display: block;
    }
    </style>
    <canvas style="height: 100%; width: 100%;"></canvas>
`;

const defaultColors = Object.values({
    hcblue: 'rgba(0, 88, 163, 1.000)',
    hcyellow: 'rgba(251, 215, 58, 1.000)',
    hcfishorange: 'rgba(255, 88, 0, 1.000)',
    hcdarkblue: 'rgba(2, 57, 103, 1.000)',
    hcawardblue: 'rgba(47, 160, 196, 1.000)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
});
const chartColors = (bars = 0) => {
    const numColors = bars === 0 ? defaultColors.length : bars;
    return (new Array(numColors)).fill(0).map((_, idx) => defaultColors[idx % defaultColors.length]);
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
        chartable.labels = data.map(({label}) => label);
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
        chartable.labels = data.map(({label}) => label);
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
    updateStackedWaterfallData(data, options = {}) {
        this._stackedWaterfallOptions(options);
        const chartData = dataToChartable(data, idx => defaultColors[idx % defaultColors.length]);
        this.chartData.labels = chartData.labels;
        this.chartData.datasets = chartData.datasets;
        this.chart.update();
    }
    _stackedWaterfallOptions({valueLabels = [], precision = -1}) {
        const valueWithPrecision = value => precision < 0 ? value : Number(value).toFixed(precision);
        const renderLabel = (valueLabel, value) => valueLabel.includes('${value}') 
            ? valueLabel.replace('${value}', valueWithPrecision(value)) 
            : `${value} ${valueLabel}`;
        const renderValueLabel = (valueLabel, value) => valueLabel ? renderLabel(valueLabel, value) : value;
        const tooltipLabel = ({datasetIndex, index}, {datasets}) => {
            const renderNoneZeroValues = (value) => {
                const valueLabel = valueLabels[datasetIndex] || '';
                return valueLabel ? renderValueLabel(valueLabel, value) : (value ? value : '');
            };
            return renderNoneZeroValues(datasets[datasetIndex].data[index]);
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

const chartLibraryUrls = {
    online: 'https://cdn.jsdelivr.net/npm/chart.js@2.8.0/dist/Chart.min.js',
    offline: '/vendor/chart.js@2.8.0/dist/Chart.min.js',
};

const loadChartLibrary = ({onLoaded}) => {
    const isOnline = navigator.onLine;
    const chartLibUrl = isOnline 
        ? chartLibraryUrls.online
        : chartLibraryUrls.offline;
    const scriptTag = document.createElement('script');
    scriptTag.onload = onLoaded;
    scriptTag.setAttribute('type', 'text/javascript');
    scriptTag.setAttribute('src', chartLibUrl);
    document.head.insertBefore(scriptTag, document.head.childNodes[0]);
};
const defineCustomElement = () => {
    customElements.define('hc-chart', HcChart);
};

loadChartLibrary({onLoaded: defineCustomElement});


