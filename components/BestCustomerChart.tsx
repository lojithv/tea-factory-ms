import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const chartSetting = {
    xAxis: [
        {
            label: 'amount (kg)',
        },
    ],
    width: 500,
    height: 400,
};
const dataset = [
    {
        amount: 55,
        name: 'Oct',
    },
    {
        amount: 48,
        name: 'Nov',
    },
    {
        amount: 25,
        name: 'Dec',
    },
];

const valueFormatter = (value: number) => `${value}kg`;

export default function BestCustomerChart() {
    return (
        <BarChart
            dataset={dataset}
            yAxis={[{ scaleType: 'band', dataKey: 'name' }]}
            series={[{ dataKey: 'amount', label: 'Price (Rs.)', valueFormatter }]}
            layout="horizontal"
            {...chartSetting}
        />
    );
}
