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
      <div className='w-1/2 h-full flex justify-center items-center bg-pattern'>
        <div className={`font-bold ${dmSerifDisplay.className} text-[48px] bg-white p-10 border-8 border-[#2da74b] text-[#2da74b] `}>Tea Leaf Collectors</div>
      </div>
      <div className="w-1/2 h-full  bg-[url('/tea-bg.jpg')] bg-cover"></div>

    </div>
  )
}
