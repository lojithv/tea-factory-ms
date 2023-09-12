import { DM_Serif_Display, Bitter } from 'next/font/google'
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

export default function Home() {
  return (
    <div className="flex flex-grow items-center justify-between">
      <div className='w-1/2 h-full flex justify-center items-center flex-col'>
        <div className={`font-bold ${dmSerifDisplay.className} text-[58px] bg-white p-10 text-[#2da74b] `}>Welcome to Home of
          <br /> Priyankara Tea Buyers</div>
        <div className={`${dmSerifDisplay.className} text-[32px] text-[#07393cff]`}>-Steeped in Downsouth Elegance-</div>
        <div className={`p-10 ${bitter.className} text-center text-[#07393cff]`}>We, the best tea leaf collectors in Downsouth who collects tea leaf from the small tea planters in your villages.</div>
      </div>
      <div className="w-1/2 h-full  bg-[url('/tea-bg.jpg')] bg-cover"></div>

    </div>
  )
}
