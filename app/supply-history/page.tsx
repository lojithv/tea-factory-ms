"use client"
import UserCard from '@/components/UserCard'
import { Bitter, DM_Serif_Display } from 'next/font/google'
import React, { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import moment from 'moment'
import useUser from '@/hooks/useUser'

type Props = {}


const dmSerifDisplay = DM_Serif_Display({
    subsets: ['latin'],
    weight: '400'
})

const bitter = Bitter({
    subsets: ['latin'],
    weight: '400'
})

const SupplyHistory = (props: Props) => {
    const [supplyHistory, setSupplyHistory] = useState<any[]>([]);
    const [error, setError] = useState<any>(null);
    const supabase = createClientComponentClient()

    const user = useUser()

    useEffect(() => {
        async function fetchData() {
            try {
                const { data, error } = await supabase
                    .from('supply_history')
                    .select(`*, users (fullname)`)
                    .eq('customer_id', user?.user.id);

                if (error) {
                    setError(error);
                } else {
                    setSupplyHistory(data);
                }
            } catch (error) {
                setError(error);
            }
        }
        if (user?.user) {
            fetchData();

        }
    }, [user]);
    return (
        <>
            <div className="flex mb-4">
                <div className="w-1/4  h-auto"></div>
                <div className="w-2/4  h-auto flex flex-col items-center">
                    <div className={`font-bold ${dmSerifDisplay.className} text-[48px] text-[#2da74b] mb-2`}>Supply History</div>
                    {supplyHistory?.map((item, i) => {
                        return (
                            <div key={i} className={`cursor-pointer w-full p-2 mb-1 mt-1 bg-white border border-gray-200 rounded-lg shadow sm:p-4`}>
                                <div className="flow-root">
                                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                        <li className="py-3 sm:py-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-1 min-w-0">
                                                    {/* <p className={`${dmSerifDisplay.className} text-sm font-medium text-gray-900 truncate `}>
                                                        {item?.users.fullname}
                                                    </p> */}
                                                    <p className={`${dmSerifDisplay.className} text-sm text-gray-500 truncate `}>
                                                        {moment(item?.created_at).format('MMMM Do YYYY')}
                                                    </p>
                                                </div>
                                                <div className="flex-1 min-w-0 text-right" >
                                                    <p className={`${dmSerifDisplay.className} text-sm font-medium text-gray-900 truncate `}>
                                                        Price: Rs.{item?.price}.00
                                                    </p>
                                                    <p className={`${dmSerifDisplay.className} text-sm text-gray-500 truncate `}>
                                                        Amount: {item?.amount} Kg
                                                    </p>
                                                </div>

                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="w-1/4  h-auto"></div>
            </div>
        </>
    )
}

export default SupplyHistory