"use client"
import UserCard from '@/components/UserCard'
import { Bitter, DM_Serif_Display } from 'next/font/google'
import React, { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

type Props = {}


const dmSerifDisplay = DM_Serif_Display({
    subsets: ['latin'],
    weight: '400'
})

const bitter = Bitter({
    subsets: ['latin'],
    weight: '400'
})

const SupplierHistory = (props: Props) => {
    const [supplyHistory, setSupplyHistory] = useState<any[]>([]);
    const [error, setError] = useState<any>(null);
    const supabase = createClientComponentClient()

    useEffect(() => {
        async function fetchData() {
            try {
                const { data, error } = await supabase
                    .from('supply_history')
                    .select(`*, users (fullname)`);

                if (error) {
                    setError(error);
                } else {
                    setSupplyHistory(data);
                }
            } catch (error) {
                setError(error);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <div className="flex mb-4">
                <div className="w-1/4  h-auto"></div>
                <div className="w-2/4  h-auto flex flex-col items-center">
                    <div className={`font-bold ${dmSerifDisplay.className} text-[48px] text-[#2da74b] mb-2`}>Supplier History</div>
                    {supplyHistory.map((item, i) => {
                        return <div key={i}>{item.amount}</div>
                    })}
                </div>
                <div className="w-1/4  h-auto"></div>
            </div>
        </>
    )
}

export default SupplierHistory