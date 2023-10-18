"use client"

import BestCustomerChart from '@/components/BestCustomerChart'
import BestSupplierChart from '@/components/BestSupplierChart'
import React from 'react'

type Props = {}

const AdminDashboard = (props: Props) => {
    return (
        <div className='pt-12'>
            <div className='flex justify-around mb-5 w-full'>
                <div className='text-center'>
                    <div>Best Suppliers of Last 30 Days</div>
                    <BestSupplierChart />
                </div>

                <div className='text-center'>
                    <div>Best Customers of Last 30 Days</div>
                    <BestCustomerChart />
                </div>

            </div>

            <div className='flex flex-col items-center justify-center'>
                <div>Monthly supplied tea leaf details</div>

                {/* <div>Weekly supplied tea leaf details</div> */}

                <div>Monthly order details</div>
            </div>

        </div>
    )
}

export default AdminDashboard