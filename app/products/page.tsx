"use client"

import Product from '@/components/Product'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Bitter, DM_Serif_Display } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const dmSerifDisplay = DM_Serif_Display({
    subsets: ['latin'],
    weight: '400'
})

const bitter = Bitter({
    subsets: ['latin'],
    weight: '400'
})

type Props = {}

const Products = (props: Props) => {
    const supabase = createClientComponentClient()

    const [selectedTab, setSelectedTab] = useState(1)

    const [user, setUser] = useState(null as any)

    const fertilizer = [
        { path: "/Fertilizer/1- Organic Manure - 5kg - Rs.250.jpg", name: "Organic Manure - 5kg", price: 'Rs.250' },
        { path: "/Fertilizer/2- Organic Manure - 10kg - Rs.500.jpg", name: "Organic Manure - 10kg", price: 'Rs.500' },
        { path: "/Fertilizer/3-Dolamite - 10kg - Rs.500.jpg", name: "Dolamite - 10kg", price: 'Rs.500' },
        { path: "/Fertilizer/4- T-65 - 50kg - Rs.1500.png", name: "4- T-65 - 50kg", price: 'Rs.1500' },
        { path: "/Fertilizer/5-T-200 - 50kg - Rs.1500.png", name: "5-T-200 - 50kg", price: 'Rs.1500' },
        { path: "/Fertilizer/6- U-709 - 50kg - Rs.1500.png", name: "U-709 - 50kg", price: 'Rs.1500' },
        { path: "/Fertilizer/7- T-65 - 10kg- Rs.300.jpg", name: "T-65 - 10kg", price: 'Rs.300' },
        { path: "/Fertilizer/8- T-200 - 10kg - Rs.300.jpg", name: "T-200 - 10kg", price: 'Rs.300' },
        { path: "/Fertilizer/9- U-709 - 10kg-Rs.300.jpg", name: "U-709 - 10kg", price: 'Rs.300' },
        { path: "/Fertilizer/10- UT-752 - 10kg- Rs.300.jpg", name: "UT-752 - 10kg", price: 'Rs.300' },
    ]
    const teaPowder = [
        { path: "/Tea Powder/1-Evergreen Tea Powder - 400g - Rs.650.jpg", name: "Evergreen Tea Powder - 400g", price: 'Rs.650' },
        { path: "/Tea Powder/2- Evergreen Brombil Tea - 400g - Rs.790.jpg", name: "Evergreen Brombil Tea - 400g", price: 'Rs.790' },
        { path: "/Tea Powder/3- Evergreen Tea Powder - 1kg - Rs.1600.jpg", name: "Evergreen Tea Powder - 1kg", price: 'Rs.1600' },
        { path: "/Tea Powder/4- Evergreen Tea Powder - 2kg - Rs.3100.jpg", name: "Evergreen Tea Powder - 2kg", price: 'Rs.3100' },
    ]

    useEffect(() => {

        supabase.auth.getUser().then((res) => {
            if (!res.error) {
                console.log(res.data)
                setUser(res.data.user)
            } else {

            }
        })

        return () => {

        }
    }, [])



    return (
        <div className='flex flex-grow items-center'>
            <div className="flex h-full w-full flex-col items-center justify-start px-10">
                <div className={`font-bold ${dmSerifDisplay.className} text-[48px] text-[#2da74b]`}>Products</div>
                <div className='flex'>
                    <div dir="ltr" onClick={() => setSelectedTab(1)}><div className={`rounded-s-lg ${selectedTab == 1 ? 'bg-[#255e33]' : 'bg-[#2da74b]'} hover:bg-[#327e45] cursor-pointer text-white p-3 min-w-[150px] text-center`}>Fertilizer</div></div>
                    <div dir="rtl" onClick={() => setSelectedTab(2)}><div className={`rounded-s-lg ${selectedTab == 2 ? 'bg-[#255e33]' : 'bg-[#2da74b]'} hover:bg-[#327e45] cursor-pointer text-white p-3 min-w-[150px] text-center`}>Tea Powder</div></div>
                </div>
                {selectedTab == 1 && (
                    <div className='flex flex-wrap gap-5 p-10'>
                        {fertilizer.map((item, i) => (
                            <Product key={i} image={item.path} name={item.name} price={item.price} user={user} />
                        ))}
                    </div>
                )}
                {selectedTab == 2 && (
                    <div className='flex flex-wrap gap-5 p-10'>
                        {teaPowder.map((item, i) => (
                            <Product key={i} image={item.path} name={item.name} price={item.price} user={user} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Products