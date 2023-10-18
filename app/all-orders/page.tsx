"use client"
import OrderedCard from '@/components/OrderedCard'
import { Bitter, DM_Serif_Display } from 'next/font/google'
import useUser from '@/hooks/useUser'
import React, { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'

type Props = {}

const dmSerifDisplay = DM_Serif_Display({
    subsets: ['latin'],
    weight: '400'
})

const bitter = Bitter({
    subsets: ['latin'],
    weight: '400'
})

const AllOrders = (props: Props) => {
    const supabase = createClientComponentClient()
    const [orders, setOrders] = useState([] as any[])
    const [error, setError] = useState<any>(null);
    const user = useUser()

    const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs());
    const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs());

    useEffect(() => {
        if (!orders.length) {
            supabase.from('orders').select('*, users(*)').eq('status', 'pending').then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setOrders(res.data)
                }
            })
        }
    }, [])

    const filterByDateRange = async () => {
        const { data, error } = await supabase.from('users').select('*, users(*)').lt('created_at', endDate).gte('created_at', startDate)
        console.log(data)
        if (data) {

        }
    }

    return (
        <>
            <div className="flex mb-4">
                <div className="w-1/4  h-auto"></div>
                <div className="w-2/4  h-auto flex flex-col items-center">
                    <div className={`font-bold ${dmSerifDisplay.className} text-[48px] text-[#2da74b] mb-2`}>Orders</div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className='flex gap-3 items-center mb-4'>
                            <DatePicker
                                label="Start Date"
                                value={startDate}
                                onChange={(newValue) => setStartDate(newValue)}
                            />
                            <div>-</div>
                            <DatePicker
                                label="End Date"
                                value={endDate}
                                onChange={(newValue) => setEndDate(newValue)}
                            />
                            <div>Apply</div>
                        </div>
                    </LocalizationProvider>
                    {orders.map((item: any, index: any) => (
                        <OrderedCard order={item} index={index} key={index} />
                    ))}
                </div>
                <div className="w-1/4  h-auto"></div>
            </div>
        </>
    )
}

export default AllOrders