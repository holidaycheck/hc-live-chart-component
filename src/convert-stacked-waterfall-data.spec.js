import {describe, it} from 'kavun';
import {assertThat, equalTo} from 'hamjest';

const convert = (data) => {
    const chartable = {labels: [], datasets: []};
    return chartable;
};

describe('Convert "stacked waterfall" values to chartable data', () => {
    it('empty data must return a valid chartable structure', () => {
        const noChartableData = {labels: [], datasets: []};
        assertThat(convert([]), equalTo(noChartableData));      
    });
});