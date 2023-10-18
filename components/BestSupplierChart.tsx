import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';

const chartSetting = {
    yAxis: [
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

export default function BestSupplierChart({ data }: { data: any[] }) {

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
            const { customer_id, price, amount } = record;
            if (aggregatedData.has(customer_id)) {
                aggregatedData.get(customer_id).push({ price, amount });
            } else {
                aggregatedData.set(customer_id, [{ price, amount }]);
            }
        });

        // Calculate a metric to evaluate suppliers (e.g., total amount spent, average price)
        const suppliersMetrics: { customer_id: any; amount: any; averagePrice: number; name: string }[] = [];
        aggregatedData.forEach((records, supplier) => {
            const totalAmount = records.reduce((sum: any, record: { amount: any; }) => sum + record.amount, 0);
            const averagePrice = records.reduce((sum: any, record: { price: any; }) => sum + record.price, 0) / records.length;
            suppliersMetrics.push({ customer_id: supplier, amount: totalAmount, averagePrice, name: data.filter((d) => d.customer_id == supplier)[0].users.fullname });
        });

        // Sort the suppliers by the chosen metric (e.g., highest total amount, lowest average price)
        suppliersMetrics.sort((a, b) => b.amount - a.amount);

        // Get the top three suppliers
        const topThreeSuppliers = suppliersMetrics.slice(0, 3);

        setChartData(topThreeSuppliers)
        console.log('Top three suppliers:', topThreeSuppliers);

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
                series={[{ dataKey: 'amount', label: 'Tea Amount', valueFormatter }]}
                layout="vertical"
                {...chartSetting}
            />


            {/* {dataset.map((d, i) => (
                <div key={i}>{d.placement} - {d.name}</div>
            ))} */}
        </div>
    );
}
