import { Abril_Fatface, DM_Serif_Display, Domine } from 'next/font/google'
import Link from 'next/link'
import React from 'react'

type Props = {}

const dmSerifDisplay = Domine({
    subsets: ['latin'],
    weight: '400'
})

const Navbar = (props: Props) => {
    return (
        <div className={`w-full flex items-center justify-between ${dmSerifDisplay.className} text-[#2c666eff] p-5`}>
            <div className='text-[#2da74b] font-bold text-[25px]'>Priyankara Tea Buyers</div>
            <div className='flex gap-5 items-center'>
                <Link href={'/'}><div className='hover:text-[#2da74b]'>Home</div></Link>
                <Link href={'/products'}><div className='hover:text-[#2da74b]'>Products</div></Link>
                <Link href={'/about-us'} className='hover:text-[#2da74b]'><div>About Us</div></Link>
                <Link href={'/contact-us'}><div className='hover:text-[#2da74b]'>Contact Us</div></Link>
                <Link href={'/login'}> <div className='bg-[#2da74b] text-white hover:bg-[#255e33] p-2'>Sign in</div></Link>
                <Link href={'/signup'}><div className='bg-[#2da74b] text-white hover:bg-[#255e33] p-2'>Sign up</div></Link>
            </div>
        </div>
    )
}

export default Navbar