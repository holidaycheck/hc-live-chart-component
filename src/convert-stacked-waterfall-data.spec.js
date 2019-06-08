import {describe, it} from 'kavun';
import {assertThat, equalTo} from 'hamjest';

const convert = (data) => {
    const labels = data.map(({label}) => label);
    const datasets = [];
    if (data.length) {
        datasets.push({data: data.map(({values}) => values[0]), backgroundColor: 'transparent'});
    }
    return {labels, datasets: datasets};
};

describe('Convert "stacked waterfall" values to chartable data', () => {
    it('empty data must return a valid chartable structure', () => {
        const noChartableData = {labels: [], datasets: []};
        assertThat(convert([]), equalTo(noChartableData));      
    });
    describe('one value, returns always just the start of the first bar, and is transparent', () => {
        it('for one data point', () => {
            const data = [
                {label: 'one', values: [1]},
            ];
            
            const chartableData = {labels: ['one'], datasets: [{data: [1], backgroundColor: 'transparent'}]};
            assertThat(convert(data), equalTo(chartableData));      
        });
        it('for multiple data points', () => {
            const data = [
                {label: 'one', values: [1]},
                {label: 'two', values: [2]},
                {label: 'three', values: [3]},
            ];
            
            const chartableData = {labels: ['one', 'two', 'three'], datasets: [{data: [1,2,3], backgroundColor: 'transparent'}]};
            assertThat(convert(data), equalTo(chartableData));      
        });
        it('for multiple data points, where some have no value', () => {
            const data = [
                {label: 'one', values: [1]},
                {label: 'none', values: []},
                {label: 'three', values: [3]},
            ];
            
            const chartableData = {labels: ['one', 'none', 'three'], datasets: [{data: [1,undefined,3], backgroundColor: 'transparent'}]};
            assertThat(convert(data), equalTo(chartableData));      
        });
    });
});