"use client"

import useUser from '@/hooks/useUser'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Abril_Fatface, DM_Serif_Display, Domine } from 'next/font/google'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {}

const dmSerifDisplay = Domine({
    subsets: ['latin'],
    weight: '400'
})

const Navbar = (props: Props) => {

    const [userType, setUserType] = useState('')

    const router = useRouter()

    const user = useUser()

    const currentPage = usePathname()

    const supabase = createClientComponentClient()

    useEffect(() => {
        console.log(currentPage)
        if (user) {
            setUserType(user.userDetails.usertype)
        }

        if (currentPage === '/') {
            if (user && user.userDetails.usertype === 'employee') {
                router.push('/employee-dashboard')
            } else if (user && user.userDetails.usertype === 'customer') {
                router.push('/user-details')
            } else if (user && user.userDetails.usertype === 'admin') {
                router.push('/admin-dashboard')
            } else {
                router.push('/')
            }
        } else if (!user?.user) {
            router.push('/')
        }
    }, [user])

    const handleLogout = () => {
        supabase.auth.signOut()
        setUserType('')
        router.push('/login')
        console.log('handle logout')
    }


    return (
        <div className={`w-full flex items-center justify-between ${dmSerifDisplay.className} text-[#2c666eff] p-5`}>
            <div className='text-[#2da74b] font-bold text-[25px]'>Priyankara Tea Buyers</div>
            <div className='flex gap-5 items-center'>
                {!userType && (
                    <>
                        <Link href={'/'}><div className='hover:text-[#2da74b]'>Home</div></Link>
                        <Link href={'/products'}><div className='hover:text-[#2da74b]'>Products</div></Link>
                        <Link href={'/about-us'} className='hover:text-[#2da74b]'><div>About Us</div></Link>
                        <Link href={'/contact-us'}><div className='hover:text-[#2da74b]'>Contact Us</div></Link>
                        <Link href={'/login'}> <div className='bg-[#2da74b] text-white hover:bg-[#255e33] p-2'>Sign in</div></Link>
                        <Link href={'/signup'}><div className='bg-[#2da74b] text-white hover:bg-[#255e33] p-2'>Sign up</div></Link>
                    </>
                )}
                {userType && userType == 'customer' && (
                    <>
                        <Link href={'/customer-dashboard'}><div className='hover:text-[#2da74b]'>Dashboard</div></Link>
                        <Link href={'/products'}><div className='hover:text-[#2da74b]'>Products</div></Link>
                        <Link href={'/suppliers'}><div className='hover:text-[#2da74b]'>Suppliers</div></Link>
                        <Link href={'/cart'}><div className='hover:text-[#2da74b]'>Cart</div></Link>
                        <Link href={'/order-history'}><div className='hover:text-[#2da74b]'>Order History</div></Link>
                        <Link href={'/user-details'}><div className='hover:text-[#2da74b]'>Profile</div></Link>
                        <div onClick={handleLogout}> <div className='bg-[#2da74b] text-white hover:bg-[#255e33] p-2'>Logout</div></div>
                    </>
                )}


                {userType && userType == 'employee' && (
                    <>
                        <Link href={'/employee-dashboard'}><div className='hover:text-[#2da74b]'>Dashboard</div></Link>
                        {/* <Link href={'/location'}><div className='hover:text-[#2da74b]'>Location</div></Link> */}
                        <Link href={'/user-details'}><div className='hover:text-[#2da74b]'>Profile</div></Link>
                        <div onClick={handleLogout}> <div className='bg-[#2da74b] text-white hover:bg-[#255e33] p-2'>Logout</div></div>
                    </>
                )}

                {userType && userType == 'admin' && (
                    <>
                        <Link href={'/admin-dashboard'}><div className='hover:text-[#2da74b]'>Dashboard</div></Link>
                        <Link href={'/customers'}><div className='hover:text-[#2da74b]'>Customers</div></Link>
                        <Link href={'/employees'}><div className='hover:text-[#2da74b]'>Employees</div></Link>
                        <Link href={'/user-details'}><div className='hover:text-[#2da74b]'>Profile</div></Link>
                        <div onClick={handleLogout}> <div className='bg-[#2da74b] text-white hover:bg-[#255e33] p-2'>Logout</div></div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Navbar