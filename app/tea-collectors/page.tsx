"use client"

import TeaCollectorCard from '@/components/TeaCollectorCard'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Bitter, DM_Serif_Display } from 'next/font/google'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
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

const TeaCollectors = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNum, setPhoneNum] = useState('')
    const router = useRouter()
    const supabase = createClientComponentClient()
    const [users, setUsers] = useState<any>();
    const [error, setError] = useState<any>(null);
    const [state, setState] = useState<boolean>(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data, error } = await supabase
                    .from('tea_collectors')
                    .select(`*, users (*)`).eq('available', true)

                if (error) {
                    setError(error);
                } else {
                    setUsers(data);
                }
            } catch (error) {
                setError(error);
            }
        }

        fetchData();
    }, []);
    return (
        <>
            <div className="flex mb-4">
                <div className="w-1/4  h-auto"></div>
                <div className="w-2/4  h-auto flex flex-col items-center">
                    <div className={`font-bold ${dmSerifDisplay.className} text-[48px] text-[#2da74b] mb-2`}>Tea collectors</div>

                    {users?.map((user: any, index: any) => (
                        <TeaCollectorCard key={index} index={index} user={user.users} route={user.route} isDelete={false} />
                    ))}
                </div>
                <div className="w-1/4  h-auto"></div>
            </div>
        </>
    )
}

export default TeaCollectors