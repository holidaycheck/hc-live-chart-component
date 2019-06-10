export const dataToChartable = (data, colors = noop) => {
    const labels = data.map(({label}) => label);
    const datasets = [];
    if (data.length) {
        const diffValues = data.map(({values}) => values.map((value, idx, all) => idx === 0 ? value : value - all[idx - 1]));
        datasets.push({data: diffValues.map(v => v[0]), backgroundColor: 'transparent'});
        const mostDataPoints = diffValues.reduce((last, cur) => cur.length > last ? cur.length : last, 0);
        for (let i = 0; i < mostDataPoints-1; i++)
            datasets.push({data: diffValues.map(v => v[i + 1]), backgroundColor: colors(i)});
    }
    return {labels, datasets: datasets};
};
