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

const Customers = (props: Props) => {
    const [customers, setCustomers] = useState<any>();
    const [error, setError] = useState<any>(null);
    const supabase = createClientComponentClient()

    useEffect(() => {
        async function fetchData() {
            try {
                const { data, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('usertype', 'customer');

                if (error) {
                    setError(error);
                } else {
                    setCustomers(data);
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
                    <div className={`font-bold ${dmSerifDisplay.className} text-[48px] text-[#2da74b] mb-2`}>Customers</div>

                    {customers?.map((user: any, index: any) => (
                        <UserCard key={index} index={index} user={user} isDelete={false} />
                    ))}
                </div>
                <div className="w-1/4  h-auto"></div>
            </div>
        </>
    )
}

export default Customers