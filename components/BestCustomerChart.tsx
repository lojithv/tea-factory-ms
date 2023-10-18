import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const chartSetting = {
    xAxis: [
        {
            label: 'amount (Rs.)',
        },
    ],
    width: 500,
    height: 400,
};
const dataset = [
    {
        amount: 55,
        name: '1st',
        placement: '1st'
    },
    {
        amount: 48,
        name: '2nd',
        placement: '2nd'
    },
    {
        amount: 25,
        name: '3rd',
        placement: '3rd'
    },
];

const valueFormatter = (value: number) => `${value}kg`;

export default function BestCustomerChart() {
    return (
        <div>
            <BarChart
                dataset={dataset}
                yAxis={[{ scaleType: 'band', dataKey: 'name' }]}
                series={[{ dataKey: 'amount', label: 'Price (Rs.)', valueFormatter }]}
                layout="horizontal"
                {...chartSetting}
            />

            {dataset.map((d, i) => (
                <div key={i}>{d.placement} - {d.name}</div>
            ))}
        </div>
    );
}
