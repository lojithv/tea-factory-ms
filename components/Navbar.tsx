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
        <div className={`w-full bg-[#2c666eff] flex items-center justify-between ${dmSerifDisplay.className} text-white p-5`}>
            <div>Priyankara Tea Buyers</div>
            <div className='flex gap-5 items-center'>
                <Link href={'/'}><div>Home</div></Link>
                <Link href={'/about-us'}><div>About Us</div></Link>
                <Link href={'/contact-us'}><div>Contact Us</div></Link>
                <Link href={'/login'}> <div className='bg-[#07393cff] p-2 '>Sign in</div></Link>
                <Link href={'/signup'}><div className='bg-[#07393cff] p-2 '>Sign up</div></Link>
            </div>
        </div>
    )
}

export default Navbar