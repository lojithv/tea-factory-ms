"use client"

import useUser from '@/hooks/useUser'
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

const Login = (props: Props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleSignIn = async () => {
        await supabase.auth.signInWithPassword({
            email,
            password,
        }).then((res) => {
            console.log(res)
            if (!res.error) {
                supabase.from('users').select().eq('userid', res.data.user.id).then((res1) => {
                    console.log(res1.data)
                    if (res1.data) {
                        const user = res1.data[0]
                        if (user.usertype == 'admin') {
                            router.push('/admin-dashboard')
                        } else if (user.usertype == 'customer') {
                            router.push('/customer-dashboard')
                        } else if (user.usertype == 'employee') {
                            router.push('/employee-dashboard')
                        }
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
                <h2 className={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight ${dmSerifDisplay.className} text-[#2da74b]`}>Sign in to your account</h2>
            </div>

            <div className={`mt-10 sm:mx-auto sm:w-full sm:max-w-sm ${bitter.className}`}>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button onClick={handleSignIn} className="flex w-full justify-center rounded-md bg-[#2da74b] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#24555c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#285d64]">Sign in</button>
                    </div>
                </div>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?
                    <a href="/signup" className="ml-1 font-semibold leading-6 text-[#2da74b] hover:text-[#23545a]">Sign Up</a>
                </p>
            </div>
        </div>
    )
}

export default Login