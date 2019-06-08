import {describe, it} from 'kavun';
import {assertThat, equalTo} from 'hamjest';

const convert = (data) => {
    const labels = data.map(({label}) => label);
    const datasets = [];
    if (data.length) {
        datasets.push({data: [1], backgroundColor: 'transparent'});
    }
    return {labels, datasets: datasets};
};

describe('Convert "stacked waterfall" values to chartable data', () => {
    it('empty data must return a valid chartable structure', () => {
        const noChartableData = {labels: [], datasets: []};
        assertThat(convert([]), equalTo(noChartableData));      
    });
    it('one value, for one data point returns only the start for the first bar, which is transparent', () => {
        const data = [
            {label: 'one', values: [1]}
        ];
        
        const noChartableData = {labels: ['one'], datasets: [{data: [1], backgroundColor: 'transparent'}]};
        assertThat(convert(data), equalTo(noChartableData));      
    });
});