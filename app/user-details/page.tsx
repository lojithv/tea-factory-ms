"use client"

import useUser from '@/hooks/useUser'
import { Mail, MapPin, Phone, UserCircle2 } from 'lucide-react'
import { Bitter, DM_Serif_Display } from 'next/font/google'
import React from 'react'

type Props = {}

const dmSerifDisplay = DM_Serif_Display({
    subsets: ['latin'],
    weight: '400'
})

const bitter = Bitter({
    subsets: ['latin'],
    weight: '400'
})

const UserDeails = (props: Props) => {

    const user = useUser()

    return (
        <div className="flex flex-grow items-center">
            <div className='w-1/2 h-full flex items-center justify-center'>
                <div className="w-1/2 h-1/2 bg-[url('/avatar.jpg')] bg-cover "></div>
            </div>
            <div className="flex h-full w-1/2 flex-col items-start justify-center px-10">
                <div className={`font-bold ${dmSerifDisplay.className} text-[48px] text-[#2da74b]`}>Profile</div>
                <div className={`${bitter.className} mt-10`}>
                    <div className='flex font-bold gap-2 text-[#2da74b]'><MapPin />Address:</div>
                    <div>
                        {user?.userDetails.address}
                    </div>
                    <div className='flex font-bold mt-5 gap-2 text-[#2da74b]'><UserCircle2 />Owner:</div>
                    <div>
                        {user?.userDetails.fullname}
                    </div>
                    <div className='flex font-bold mt-5 gap-2 text-[#2da74b]'><Phone />Contact:</div>
                    <div>
                        {user?.userDetails.phonenumber}
                    </div>
                    <div className='flex font-bold mt-5 gap-2 text-[#2da74b]'><Mail />Email:</div>
                    <div>
                        {user?.user.email}
                    </div>



                </div>
            </div>
        </div>
    )
}

export default UserDeails