"use client"
import OrderedCard from '@/components/OrderedCard'
import { Bitter, DM_Serif_Display } from 'next/font/google'
import useUser from '@/hooks/useUser'
import React, { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import MyOrderedCard from '@/components/MyOrderedCard'

type Props = {}

const dmSerifDisplay = DM_Serif_Display({
    subsets: ['latin'],
    weight: '400'
})

const bitter = Bitter({
    subsets: ['latin'],
    weight: '400'
})

const OrderHistory = (props: Props) => {
    const supabase = createClientComponentClient()
    const [orders, setOrders] = useState([] as any[])
    const [error, setError] = useState<any>(null);
    const user = useUser()

    useEffect(() => {
        if (user && !orders.length) {
            supabase.from('orders').select('*, users(*)').eq('userid', user?.user.id).then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setOrders(res.data)
                }
            })
        }
    }, [user])
    return (
        <>
            <div className="flex mb-4">
                <div className="w-1/4  h-auto"></div>
                <div className="w-2/4  h-auto flex flex-col items-center">
                    <div className={`font-bold ${dmSerifDisplay.className} text-[48px] text-[#2da74b] mb-2`}>Order history</div>
                    {orders.map((item: any, index: any) => (
                        <MyOrderedCard order={item} index={index} key={index} />
                    ))}
                </div>
                <div className="w-1/4  h-auto"></div>
            </div>
        </>
    )
}

export default OrderHistory