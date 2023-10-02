"use client"

import { Bitter, DM_Serif_Display } from 'next/font/google'
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import moment from 'moment';

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

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    useEffect(() => {

        const parsedItems = JSON.parse(order?.items);
        setItems(parsedItems)
    }, [order])

    const formattedDate = moment(order.created_at).format('MMMM Do YYYY');

    return (
        <div key={index} className={` w-full p-2 mb-1 mt-1 bg-white border border-gray-200 rounded-lg shadow sm:p-4 `}>
            <div className="flow-root">
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
                                    <p className={`${dmSerifDisplay.className} text-sm text-gray-500 truncate `}>
                                        {item?.product || item?.name}
                                    </p>
                                </td>
                                <td>
                                    <p className={`${dmSerifDisplay.className} text-sm text-gray-500 truncate `}>
                                        {item?.qty}
                                    </p>
                                </td>
                                <td>
                                    <p className={`${dmSerifDisplay.className} text-sm text-gray-500 truncate `}>
                                        Rs. {item?.price}
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
                                    Rs. {order.total}
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <p className={`${dmSerifDisplay.className} mt-4 text-sm text-center font-medium text-gray-500 truncate `}>
                    Ordered Date: {formattedDate}
                </p>
            </div>
        </div>
    );
}

export default OrderedCard;