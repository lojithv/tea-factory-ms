"use client"

import { Bitter, DM_Serif_Display } from 'next/font/google'
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const dmSerifDisplay = DM_Serif_Display({
    subsets: ['latin'],
    weight: '400'
})

const bitter = Bitter({
    subsets: ['latin'],
    weight: '400'
})
interface UserProps {
    order: any;
    index: number;
}
const OrderedCard: React.FC<UserProps> = ({ order, index }) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [items, setItems] = useState([] as any[])
    // const router = useRouter();

    const [orderData, setOrderData] = useState(order)

    const supabase = createClientComponentClient()

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    useEffect(() => {

        const parsedItems = JSON.parse(order?.items);
        setItems(parsedItems)
    }, [order])

    const formattedDate = moment(order.created_at).format('MMMM Do YYYY');

    const handleAcceptReject = async (action: string) => {
        const { data, error } = await supabase.from('orders').update({ status: action }).eq('id', order.id)
        setOrderData({ ...order, status: action })
        console.log(data)
        console.log(error)
    }

    return (
        <div key={index} className={` w-full p-2 mb-1 mt-1 bg-white border border-gray-200 rounded-lg shadow sm:p-4 `}>
            <div className="flow-root">
                <div>Customer Name: {order.users?.fullname}</div>
                <div>Address: {order.users?.address}</div>
                <table className="table-fixed min-w-full">
                    <thead>
                        <tr>
                            <td className='w-2/4'>
                                <p className={`${dmSerifDisplay.className} text-sm font-medium text-gray-900 truncate `}>
                                    Items
                                </p>
                            </td>
                            <td className='w-1/4'>
                                <p className={`${dmSerifDisplay.className} text-sm font-medium text-gray-900 truncate `}>
                                    Quantity
                                </p>
                            </td>
                            <td className='w-1/4'>
                                <p className={`${dmSerifDisplay.className} text-sm font-medium text-gray-900 truncate `}>
                                    Price
                                </p>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {items?.map((item: any, index: number) => (
                            <tr key={index}>
                                <td >
                                    <p className={`${dmSerifDisplay.className} text-sm text-green-700 truncate `}>
                                        {item?.product || item?.name}
                                    </p>
                                </td>
                                <td>
                                    <p className={`${dmSerifDisplay.className} text-sm text-green-700 truncate `}>
                                        {item?.qty}
                                    </p>
                                </td>
                                <td>
                                    <p className={`${dmSerifDisplay.className} text-sm text-green-700 truncate `}>
                                        Rs. {item?.price}.00
                                    </p>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td >
                                <p className={`${dmSerifDisplay.className} mt-4 text-sm font-medium text-gray-900 truncate `}>
                                    Total
                                </p>
                            </td>
                            <td></td>
                            <td>
                                <p className={`${dmSerifDisplay.className} text-sm font-medium text-gray-900 truncate `}>
                                    Rs. {order.total}.00
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='flex justify-between items-center mt-4 '>
                <p className={`${dmSerifDisplay.className} text-sm text-center font-medium text-green-700 truncate `}>
                    Ordered Date: {formattedDate}
                </p>
                {orderData.status == 'pending' && (
                    <div className='flex gap-2'>
                        <div className='bg-[#2da74b] text-white hover:bg-[#255e33] p-2' onClick={() => handleAcceptReject('completed')}>Mark as Complete</div>
                        {/* <div onClick={() => handleAcceptReject('rejected')}>Reject</div> */}
                    </div>

                )}
                {orderData.status != 'pending' && (
                    <div className={`flex gap-2 text-white hover:bg-[#255e33] p-2 rounded-full ${orderData.status == 'completed' ? 'bg-[#2da74b]' : 'bg-[#9c2727]'}`}>
                        {orderData.status}
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrderedCard;