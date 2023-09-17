"use client"

import { Bitter, DM_Serif_Display } from 'next/font/google'
import React, { useState } from 'react'

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

    const handleRouteSelect = (e: any) => {
        setSelectedRoute(e.target.value)
    }

    return (
        <div className="flex flex-grow flex-col justify-start px-6 py-12 lg:px-8 gap-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight ${dmSerifDisplay.className} text-[#2da74b]`}>Select Route</h2>
            </div>
            <div className='w-full flex justify-center'>
                <select className='w-fit' value={selectedRoute} onChange={handleRouteSelect}>
                    <option value="none">None</option>
                    <option value="Thalagaspe - Katandola">Thalagaspe - Katandola</option>
                    <option value="Thalagaspe - Kellapatha">Thalagaspe - Kellapatha</option>
                    <option value="Katandola - Elpitiya">Katandola - Elpitiya</option>
                    <option value="Kellapatha - Pitigala">Kellapatha - Pitigala</option>
                    <option value="Kellapatha - Porawagam">Kellapatha - Porawagama</option>
                </select>
            </div>

        </div>
    )
}


export default EmployeeDashboard