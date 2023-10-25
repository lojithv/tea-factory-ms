"use client"

import useUser from '@/hooks/useUser'
import { Briefcase, Calendar, Mail, MapPin, Phone, UserCircle2 } from 'lucide-react'
import { Bitter, DM_Serif_Display } from 'next/font/google'
import React, { useEffect, useState } from 'react'
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

const SingleEmoplyee = ({ params }: { params: { slug: string } }) => {
    const [user, setUser] = useState<any>();
    const [error, setError] = useState<any>();
    const [userId, setUserId] = useState<any>();

    const [data, setData] = useState<any>(null)
    const supabase = createClientComponentClient()

    useEffect(() => {
        setUserId(params.slug)

        async function fetchData() {
            try {
                const { data, error } = await supabase
                    .from('tea_collectors')
                    .select('*, users (*)')
                    .eq('employee_id', params.slug);

                if (error) {
                    console.log(error)
                    setError(error);
                } else {
                    setUser(data[0].users);
                    setData(data[0])
                }
            } catch (error) {
                setError(error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="flex flex-grow items-center">
            <div className='w-1/2 h-full flex items-center justify-center'>
                <div className="w-1/2 h-1/2 bg-[url('/avatar.jpg')] bg-cover "></div>
            </div>
            <div className="flex h-full w-1/2 flex-col items-start justify-center px-10">
                <div className={`font-bold ${dmSerifDisplay.className} text-[48px] text-[#2da74b]`}>Profile</div>
                <div className={`${bitter.className} mt-10`}>
                    <div className='flex font-bold gap-2 text-[#2da74b]'><Briefcase />Availability:</div>
                    <div>
                        {data ? data.available ? 'Available' : "Not Available" : 'Not Set'}
                    </div>
                    <div className='flex font-bold mt-5 gap-2 text-[#2da74b]'><MapPin />Route:</div>
                    <div>
                        {data ? data.route : 'Not Set'}
                    </div>
                    <div className='flex font-bold mt-5 gap-2 text-[#2da74b]'><UserCircle2 />Name:</div>
                    <div>
                        {user?.fullname}
                    </div>
                    <div className='flex font-bold mt-5 gap-2 text-[#2da74b]'><Phone />Contact:</div>
                    <div>
                        {user?.phonenumber}
                    </div>
                    <div className='flex font-bold mt-5 gap-2 text-[#2da74b]'><Calendar />Available Days:</div>
                    <div className='flex gap-2'>
                        {data && data.availabilities ? data.availabilities.map((av: { available: any; day: any }, i: React.Key | null | undefined) => (av.available && <div key={i}>{av.day}</div>)) : <div>Not Found</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleEmoplyee