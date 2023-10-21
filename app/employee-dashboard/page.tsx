"use client"

import useUser from '@/hooks/useUser'
import { Bitter, DM_Serif_Display } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Swal from 'sweetalert2'
import { userSubject } from '@/context/UserData'

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
    const [availablity, setAvailability] = useState<any>('none')
    const user = useUser()
    const supabase = createClientComponentClient()
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState(true)

    const daysModel = [
        { day: 'Sunday', available: true },
        { day: 'Monday', available: true },
        { day: 'Tuesday', available: true },
        { day: 'Wednesday', available: true },
        { day: 'Thursday', available: true },
        { day: 'Friday', available: true },
        { day: 'Saturday', available: true }
    ];

    const [days, updateDays] = useState<any[]>([])

    const handleRouteSelect = (e: any) => {
        setSelectedRoute(e.target.value)
    }

    const handleAvailablityChange = (e: any) => {
        setAvailability(e.target.value)
    }



    useEffect(() => {

        // userSubject.subscribe((res) => {
        console.log("user===>", user)

        if (user && loading) {
            fetchData()
        }
        // })
    }, [user])

    const fetchData = async () => {
        console.log("fetch data")
        const { data, error } = await supabase.from('tea_collectors').select('*').eq('employee_id', user?.user.id)
        if (data) {
            console.log(data[0].availabilities)
            if (availablity == 'none') {
                setAvailability(data[0].available ? 'available' : 'not-available')
            }
            if (selectedRoute == 'none') {
                setSelectedRoute(data[0].route)
            }

            if (!days.length && data[0].availabilities) {
                updateDays(data[0].availabilities)
            } else {
                updateDays(daysModel)
            }
            setLoading(false)
        }
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

    const updateAvailability = async () => {
        console.log('updateAvailability')
        try {
            const { data, error } = await supabase
                .from('tea_collectors')
                .upsert([
                    {
                        available: availablity == 'available' ? true : false,
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
    }

    const updateAvailabileDays = async () => {
        if (days && days.length)
            try {
                const { data, error } = await supabase
                    .from('tea_collectors')
                    .upsert([
                        {
                            availabilities: days,
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
    }

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

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight ${dmSerifDisplay.className} text-[#2da74b]`}>Set Availability</h2>
            </div>
            <div className='w-full flex justify-center'>
                <select className='w-fit border border-black rounded-md' value={availablity} onChange={handleAvailablityChange}>
                    <option value="none">None</option>
                    <option value="available">Available</option>
                    <option value="not-available">Not Available</option>
                </select>
            </div>
            <div className='flex justify-center'>
                <button
                    onClick={() => updateAvailability()}
                    className={`${dmSerifDisplay.className} mb-4 bg-[#2da74b] hover:bg-[#2da74b]-700 text-white font-bold py-2 px-4 rounded`}
                >
                    Set Availability
                </button>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight ${dmSerifDisplay.className} text-[#2da74b]`}>Set Availabile Days</h2>
            </div>
            <div className='w-full flex justify-center'>

                {loading && (<div className='h-full flex items-center justify-center'><div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-green-500 border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span>
                </div></div>)}

                {days.map((d, i) => (
                    <div key={i} className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">

                        <label
                            className="inline-block pl-[0.15rem] hover:cursor-pointer"
                        >
                            <input
                                className="accent-green-700 mr-1"
                                type="checkbox"
                                checked={d.available}
                                onChange={(e) => updateDays((data) => data.map((dt, j) => j == i ? { ...dt, available: e.target.checked } : dt))}
                            />
                            {d.day}
                        </label>
                    </div>
                ))}

            </div>
            <div className='flex justify-center'>
                <button
                    onClick={() => updateAvailabileDays()}
                    className={`${dmSerifDisplay.className} mb-4 bg-[#2da74b] hover:bg-[#2da74b]-700 text-white font-bold py-2 px-4 rounded`}
                >
                    Update
                </button>
            </div>
        </div>
    )
}


export default EmployeeDashboard