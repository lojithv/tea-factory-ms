"use client"

import BestCustomerChart from '@/components/BestCustomerChart'
import BestSupplierChart from '@/components/BestSupplierChart'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect, useState } from 'react'

import { mkConfig, generateCsv, download } from "export-to-csv";

const csvConfig = mkConfig({ useKeysAsHeaders: true });

type Props = {}

const AdminDashboard = (props: Props) => {
    const supabase = createClientComponentClient()
    const [orders, setOrders] = useState([] as any[])
    const [supplyHistory, setSupplyHistory] = useState<any[]>([]);


    useEffect(() => {
        // Get the current date
        var currentDate = new Date();

        // Calculate the date 30 days ago
        var thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(currentDate.getDate() - 30);

        // Display the result
        console.log("30 days ago was:", thirtyDaysAgo);

        if (!orders.length) {
            supabase.from('orders').select('*, users(*)')
                .eq('status', 'completed').gt('created_at', thirtyDaysAgo.toISOString())
                .lt('created_at', currentDate.toISOString()).then((res) => {
                    if (res.data) {
                        console.log(res.data)
                        setOrders(res.data)
                    }
                })
        }

        if (!supplyHistory.length) {
            supabase
                .from('supply_history')
                .select(`*, users(*)`).gt('created_at', thirtyDaysAgo.toISOString())
                .lt('created_at', currentDate.toISOString()).then((res) => {
                    if (res.data) {
                        console.log(res.data)
                        setSupplyHistory(res.data);
                    }
                })
        }
    }, [])

    const exportOrders = () => {
        const orderDetails = orders.map((o) => {
            const products = JSON.parse(o.items)
            return {
                id: o.id, date: new Date(o.created_at)
                    .toDateString(), name: o.users.fullname, price: o.total, phoneNo: o.users.phonenumber.toString()
            }
        })
        const csv = generateCsv(csvConfig)(orderDetails);
        download({ ...csvConfig, filename: 'Order Details' })(csv)
    }

    const exportSupplyDetails = () => {
        const supplyDetails = supplyHistory.map((s) => {
            // const products = JSON.parse(s.items)
            return {
                id: s.id, date: new Date(s.created_at)
                    .toDateString(), name: s.users.fullname, amount: s.amount, price: s.price, phoneNo: s.users.phonenumber.toString()
            }
        })
        const csv = generateCsv(csvConfig)(supplyDetails);
        download({ ...csvConfig, filename: 'Supply Details' })(csv)
    }

    return (
        <div className='pt-12'>
            <div className='flex justify-around mb-5 w-full'>
                <div className='text-center min-h-[200px]'>
                    <div>Best Suppliers of Last 30 Days</div>
                    <BestSupplierChart data={supplyHistory} />
                </div>

                <div className='text-center min-h-[200px]'>
                    <div>Best Customers of Last 30 Days</div>
                    <BestCustomerChart data={orders} />
                </div>

            </div>

            <div className='flex flex-col items-center justify-center'>
                {/* <div>Monthly supplied tea leaf details</div> */}
                <div className='flex items-center gap-5 mt-5'><div>Monthly supplied tea leaf details</div><div className='bg-[#2da74b] text-white hover:bg-[#255e33] p-2 cursor-pointer' onClick={exportSupplyDetails}>Export</div></div>
                {/* <div>Weekly supplied tea leaf details</div> */}

                <div className='flex items-center gap-5 mt-5'><div>Monthly order details</div><div className='bg-[#2da74b] text-white hover:bg-[#255e33] p-2 cursor-pointer' onClick={exportOrders}>Export</div></div>
            </div>

        </div>
    )
}

export default AdminDashboard