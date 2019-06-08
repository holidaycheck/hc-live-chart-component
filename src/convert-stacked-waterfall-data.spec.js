import {describe, it, xit} from 'kavun';
import {assertThat, equalTo} from 'hamjest';

const noop = () => {};
const convert = (data, colors = noop) => {
    const labels = data.map(({label}) => label);
    const datasets = [];
    const diffValues = data.map(({values}) => values.map((value, idx, all) => idx === 0 ? value : value - all[idx - 1]));
    if (data.length) {
        datasets.push({data: diffValues.map(v => v[0]), backgroundColor: 'transparent'});
        if (data.length === 6) {
            datasets.push({data: diffValues.map(v => v[1]), backgroundColor: colors(0)});
            datasets.push({data: diffValues.map(v => v[2]), backgroundColor: colors(1)});
            datasets.push({data: diffValues.map(v => v[3]), backgroundColor: colors(2)});
        } else if (data.length) {
            if (data[0].values.length > 1 || (data[1] && data[1].values.length > 1) || (data[2] && data[2].values.length > 1)) {
                datasets.push({data: diffValues.map(v => v[1]), backgroundColor: colors(0)});
            }
        }
    }
    return {labels, datasets: datasets};
};

describe('Convert "stacked waterfall" values to chartable data', () => {
    const colors = (index) => ['color-one', 'color-two', 'color-three',][index];
    
    it('empty data must return a valid chartable structure', () => {
        const noChartableData = {labels: [], datasets: []};
        assertThat(convert([]), equalTo(noChartableData));      
    });
    describe('(at most) one value, returns always just the start of the first bar, and is transparent', () => {
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
    describe('(at most) two values, returns one bar in one color', () => {
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
        it('for multiple data points, where some have no value or one', () => {
            const data = [
                {label: 'none', values: []},
                {label: 'one', values: [2]},
                {label: 'two', values: [1,2]},
            ];

            const datasets = [
                {data: [undefined,2,1], backgroundColor: 'transparent'},
                {data: [undefined,undefined,1], backgroundColor: 'color-one'},
            ];
            const chartableData = {labels: ['none', 'one', 'two'], datasets};
            assertThat(convert(data, colors), equalTo(chartableData));      
        });
    });
    describe('with >2 data points, returns multiple bars in different colors', () => {
        it('for multiple data points, where some have no value or one', () => {
            const data = [
                {label: 'none', values: []},
                {label: 'one', values: [2]},
                {label: 'two', values: [1,2]},
                {label: 'three', values: [1,2,3]},
                {label: 'four', values: [1,2,4,6]},
                {label: 'four1', values: [1,2,4,8]},
            ];

            const datasets = [
                {data: [undefined,2,        1,          1,          1,1], backgroundColor: 'transparent'},
                {data: [undefined,undefined,1,          1,          1,1], backgroundColor: 'color-one'},
                {data: [undefined,undefined,undefined,  1,          2,2], backgroundColor: 'color-two'},
                {data: [undefined,undefined,undefined,  undefined,  2,4], backgroundColor: 'color-three'},
            ];
            const chartableData = {labels: ['none', 'one', 'two', 'three', 'four', 'four1'], datasets};
            assertThat(convert(data, colors).labels, equalTo(chartableData.labels));      
            assertThat(convert(data, colors).datasets, equalTo(chartableData.datasets));      
        });
    });
});
