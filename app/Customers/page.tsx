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

const page = (props: Props) => {
    return (
        <div className='flex flex-grow items-center'>
            <div className="flex h-full w-full flex-col items-center justify-start px-10">
                <div className={`font-bold ${dmSerifDisplay.className} text-[48px] text-[#2da74b]`}>Customers</div>
                <div className='flex'>

                </div>

            </div>
        </div>
    )
}

export default page