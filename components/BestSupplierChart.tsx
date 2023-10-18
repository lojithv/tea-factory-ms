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
        name: 'Customer1',
    },
    {
        amount: 48,
        name: 'Customer2',
    },
    {
        amount: 25,
        name: 'Customer3',
    },
];

const valueFormatter = (value: number) => `${value}kg`;

export default function BestSupplierChart() {
    return (
        <BarChart
            dataset={dataset}
            yAxis={[{ scaleType: 'band', dataKey: 'name' }]}
            series={[{ dataKey: 'amount', label: 'Tea Amount', valueFormatter }]}
            layout="horizontal"
            {...chartSetting}
        />
    );
}
