"use client"

import BestSupplierChart from '@/components/BestSupplierChart'
import React from 'react'

type Props = {}

const AdminDashboard = (props: Props) => {
    return (
        <div>
            <div>Best Suppliers of Last 30 Days</div>
            <BestSupplierChart />

            <div>Best Customers of Last 30 Days</div>

            <div>Monthly supplied tea leaf details</div>

            <div>Weekly supplied tea leaf details</div>

            <div>Monthly order details</div>
        </div>
    )
}

export default AdminDashboard