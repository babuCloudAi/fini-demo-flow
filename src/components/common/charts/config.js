export const areaChartConfig = {
    tick: {
        fill: '#000',
        fontSize: 12,
        fontWeight: 400
    },
    axisStroke: '#E6E6E6',
    stroke: '#2893E8',
    tooltip: {
        contentStyle: {
            backgroundColor: '#fff',
            borderRadius: 5
        },
        cursor: {
            fill: 'rgba(200, 200, 200, 0.3)'
        }
    },
    stops: [
        {
            offset: '5%',
            stopColor: '#2893E8',
            stopOpacity: 0.8
        },
        {
            offset: '95%',
            stopColor: '#2893E8',
            stopOpacity: 0.1
        }
    ]
};

export const chartConfig = {
    tick: {
        fill: '#000',
        fontSize: 12,
        fontWeight: 400
    },
    axisStroke: '#E6E6E6',
    barFill: '#1c71b5',
    tooltip: {
        contentStyle: {
            backgroundColor: '#fff',
            borderRadius: 5
        },
        cursor: {
            fill: 'rgba(200, 200, 200, 0.3)'
        }
    }
};

export const compactPieChartConfig = {
    innerRadius: 30,
    outerRadius: 38,
    startAngle: 90,
    endAngle: -270,
    paddingAngle: 0,
    width: 80,
    height: 80,
    fill: '#8884d8'
};

export const expandedPieChartConfig = {
    innerRadius: 50,
    outerRadius: 80,
    startAngle: 90,
    endAngle: -270,
    paddingAngle: -2,
    width: '100%',
    height: 200,
    fill: '#8884d8'
};

// constants/colors.js
export const CHART_COLORS = [
    '#1C71B5',
    '#5CB3F9',
    '#FABF1F',
    '#9F92C3',
    '#2D9BB8',
    '#CE6D1E',
    '#593E7A',
    '#D48C84',
    '#CABE39'
];
