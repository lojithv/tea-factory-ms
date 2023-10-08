"use client"

import useUser from '@/hooks/useUser'
import { Bitter, DM_Serif_Display } from 'next/font/google'
import React, { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
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

const EmployeeDashboard = (props: Props) => {

    const [selectedRoute, setSelectedRoute] = useState('none')
    const user = useUser()
    const supabase = createClientComponentClient()
    const [error, setError] = useState<any>(null);
    console.log("user===>", user)

    const handleRouteSelect = (e: any) => {
        setSelectedRoute(e.target.value)
    }

    const addRoute = async () => {
        try {
            const { data, error } = await supabase
                .from('tea_collectors')
                .upsert([
                    {
                        route: selectedRoute,
                        employee_id: user?.userDetails?.userid,
                    },
                ], { onConflict: 'employee_id' })
                .select();


            if (error) {
                setError(error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                    confirmButtonColor: '#2da74b'
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Successfully Added',
                    confirmButtonColor: '#2da74b'
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Network error",
                confirmButtonColor: '#2da74b'
            })
        }
    };

    return (
        <div className="flex flex-grow flex-col justify-start px-6 py-12 lg:px-8 gap-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight ${dmSerifDisplay.className} text-[#2da74b]`}>Select Route</h2>
            </div>
            <div className='w-full flex justify-center'>
                <select className='w-fit border border-black rounded-md' value={selectedRoute} onChange={handleRouteSelect}>
                    <option value="none">None</option>
                    <option value="Thalagaspe - Katandola">Thalagaspe - Katandola</option>
                    <option value="Thalagaspe - Kellapatha">Thalagaspe - Kellapatha</option>
                    <option value="Katandola - Elpitiya">Katandola - Elpitiya</option>
                    <option value="Kellapatha - Pitigala">Kellapatha - Pitigala</option>
                    <option value="Kellapatha - Porawagam">Kellapatha - Porawagama</option>
                </select>
            </div>
            <div className='flex justify-center'>
                <button
                    onClick={() => addRoute()}
                    className={`${dmSerifDisplay.className} mb-4 bg-[#2da74b] hover:bg-[#2da74b]-700 text-white font-bold py-2 px-4 rounded`}
                >
                    Add route
                </button>
            </div>

        </div>
    )
}


export default EmployeeDashboard