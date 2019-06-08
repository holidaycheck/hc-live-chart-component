import {describe, it, xit} from 'kavun';
import {assertThat, equalTo} from 'hamjest';

const noop = () => {};
const convert = (data, colors = noop) => {
    const labels = data.map(({label}) => label);
    const datasets = [];
    if (data.length) {
        datasets.push({data: data.map(({values}) => values[0]), backgroundColor: 'transparent'});
        if (data[0].values.length > 1) {
            const areInteger = (value1, value2) => Number.isInteger(value1) && Number.isInteger(value2);
            const toChartableValue = ({values}) => areInteger(values[0], values[1]) ? values[1] - values[0] : undefined;
            datasets.push({data: data.map(toChartableValue), backgroundColor: colors(0)});
        }
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
    describe('two value, returns one bar in one color', () => {
        const colors = (index) => ['color-one'][index];
        it('for one data point', () => {
            const data = [
                {label: 'one', values: [1,2]},
            ];

            const datasets = [
                {data: [1], backgroundColor: 'transparent'},
                {data: [1], backgroundColor: 'color-one'},
            ];
            const chartableData = {labels: ['one'], datasets};
            assertThat(convert(data, colors), equalTo(chartableData));      
        });
        it('for multiple data points', () => {
            const data = [
                {label: 'one', values: [1,2]},
                {label: 'two', values: [2,3]},
                {label: 'three', values: [3,6]},
            ];

            const datasets = [
                {data: [1,2,3], backgroundColor: 'transparent'},
                {data: [1,1,3], backgroundColor: 'color-one'},
            ];
            const chartableData = {labels: ['one', 'two', 'three'], datasets};
            assertThat(convert(data, colors), equalTo(chartableData));      
        });
        it('for multiple data points, where some have no value', () => {
            const data = [
                {label: 'one', values: [1,2]},
                {label: 'none', values: []},
                {label: 'three', values: [2,4]},
            ];

            const datasets = [
                {data: [1,undefined,2], backgroundColor: 'transparent'},
                {data: [1,undefined,2], backgroundColor: 'color-one'},
            ];
            const chartableData = {labels: ['one', 'none', 'three'], datasets};
            assertThat(convert(data, colors), equalTo(chartableData));      
        });
    });
});
