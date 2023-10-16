"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Bitter, DM_Serif_Display } from 'next/font/google'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

type Props = {}

const dmSerifDisplay = DM_Serif_Display({
    subsets: ['latin'],
    weight: '400'
})

const bitter = Bitter({
    subsets: ['latin'],
    weight: '400'
})

const SignUp = (props: Props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNum, setPhoneNum] = useState('')

    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleSignUp = async () => {
        if (password !== confirmedPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Passwords do not match",
                confirmButtonColor: '#2da74b'
            })
            return
        }
        await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/`,
                data: { fullName: "test name", address: "test add", phoneNum: "08734234" }
            },
        }).then((res) => {
            console.log(res)
            if (!res.error) {
                supabase.from('users').insert({ userid: res.data.user?.id, fullname: fullName, address: address, phonenumber: phoneNum, usertype: 'customer', email: res.data.user?.email }).then((res1) => {
                    if (!res1.error) {
                        router.push('/login')
                    }
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.error.message,
                    confirmButtonColor: '#2da74b'
                })
            }
        })
        // router.refresh()
    }
    return (
        <div className="flex flex-grow flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight ${dmSerifDisplay.className} text-[#2da74b]`}>Create an account</h2>
            </div>

            <div className={`mt-10 sm:mx-auto sm:w-full sm:max-w-sm ${bitter.className}`}>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                        <div className="mt-2">
                            <input id="name" name="name" type="text" onChange={(e) => setFullName(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" autoComplete="email" required onChange={(e) => setEmail(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="confirmpassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                        </div>
                        <div className="mt-2">
                            <input id="confirmpassword" name="confirmpassword" type="password" onChange={(e) => setConfirmedPassword(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">Address</label>
                        </div>
                        <div className="mt-2">
                            <input id="address" name="address" type="text" required onChange={(e) => setAddress(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="phonenum" className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                        </div>
                        <div className="mt-2">
                            <input id="phonenum" name="phonenum" type="number" required onChange={(e) => setPhoneNum(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button onClick={handleSignUp} className="flex w-full justify-center rounded-md bg-[#2da74b] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#24555c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#285d64]">Sign Up</button>
                    </div>
                </div>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already have an account?
                    <a href="/login" className="ml-1 font-semibold leading-6 text-[#2da74b] hover:text-[#23545a]">Sign In</a>
                </p>
            </div>
        </div>
    )
}

export default SignUp