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
        london: 59,
        paris: 57,
        newYork: 86,
        amount: 21,
        month: 'Jan',
    },
    {
        london: 50,
        paris: 52,
        newYork: 78,
        amount: 28,
        month: 'Fev',
    },
    {
        london: 47,
        paris: 53,
        newYork: 106,
        amount: 41,
        month: 'Mar',
    },
    {
        london: 54,
        paris: 56,
        newYork: 92,
        amount: 73,
        month: 'Apr',
    },
    {
        london: 57,
        paris: 69,
        newYork: 92,
        amount: 99,
        month: 'May',
    },
    {
        london: 60,
        paris: 63,
        newYork: 103,
        amount: 144,
        month: 'June',
    },
    {
        london: 59,
        paris: 60,
        newYork: 105,
        amount: 319,
        month: 'July',
    },
    {
        london: 65,
        paris: 60,
        newYork: 106,
        amount: 249,
        month: 'Aug',
    },
    {
        london: 51,
        paris: 51,
        newYork: 95,
        amount: 131,
        month: 'Sept',
    },
    {
        london: 60,
        paris: 65,
        newYork: 97,
        amount: 55,
        month: 'Oct',
    },
    {
        london: 67,
        paris: 64,
        newYork: 76,
        amount: 48,
        month: 'Nov',
    },
    {
        london: 61,
        paris: 70,
        newYork: 103,
        amount: 25,
        month: 'Dec',
    },
];

const valueFormatter = (value: number) => `${value}kg`;

export default function BestCustomerChart() {
    return (
        <BarChart
            dataset={dataset}
            yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[{ dataKey: 'amount', label: 'Tea Amount', valueFormatter }]}
            layout="horizontal"
            {...chartSetting}
        />
    );
}
