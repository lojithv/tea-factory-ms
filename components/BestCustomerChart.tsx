import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';

const chartSetting = {
    yAxis: [
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

export default function BestCustomerChart({ data }: { data: any[] }) {

    const [chartData, setChartData] = useState<any[]>([])


    useEffect(() => {
        if (data && data.length) {
            generateChartData()
        }
    }, [data])

    const generateChartData = () => {
        // Sample raw data (assuming an array of objects with supplier records)
        const rawData = data;

        // Create a map to aggregate data for each supplier
        const aggregatedData = new Map();

        rawData.forEach(record => {
            const { userid, total } = record;
            if (aggregatedData.has(userid)) {
                aggregatedData.get(userid).push({ total });
            } else {
                aggregatedData.set(userid, [{ total }]);
            }
        });

        // Calculate a metric to evaluate suppliers (e.g., total amount spent, average price)
        const customersMetrics: { userid: any; amount: any; name: string }[] = [];
        aggregatedData.forEach((records, user) => {
            const totalAmount = records.reduce((sum: any, record: { total: any; }) => sum + record.total, 0);
            // const averagePrice = records.reduce((sum: any, record: { price: any; }) => sum + record.price, 0) / records.length;
            customersMetrics.push({ userid: user, amount: totalAmount, name: data.filter((d) => d.userid == user)[0].users.fullname });
        });

        // Sort the suppliers by the chosen metric (e.g., highest total amount, lowest average price)
        customersMetrics.sort((a, b) => b.amount - a.amount);

        // Get the top three suppliers
        const topThreeCustomers = customersMetrics.slice(0, 3);

        setChartData(topThreeCustomers)
        console.log('Top three suppliers:', topThreeCustomers);

    }

    if (!chartData.length) {
        return (<div className='h-full flex items-center justify-center'><div
            className="inline-block h-8 w-8 animate-spin rounded-full border-green-500 border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
        </div></div>)
    }

    return (
        <div>
            <BarChart
                dataset={chartData}
                xAxis={[{ scaleType: 'band', dataKey: 'name' }]}
                series={[{ dataKey: 'amount', label: 'Price (Rs.)', valueFormatter }]}
                layout="vertical"
                {...chartSetting}
            />

            {/* {dataset.map((d, i) => (
                <div key={i}>{d.placement} - {d.name}</div>
            ))} */}
        </div>
    );
}
