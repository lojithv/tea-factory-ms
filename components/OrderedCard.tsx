"use client"

import { Bitter, DM_Serif_Display } from 'next/font/google'
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'

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

    return (
        <div key={index} className={` w-full p-2 mb-1 mt-1 bg-white border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700`}>
            <div className="flow-root">
                <table  className="table-fixed min-w-full">
                <thead>
                    <tr>
                        <td className='w-2/4'>
                            <p className={`${dmSerifDisplay.className} text-sm font-medium text-gray-900 truncate dark:text-white`}>
                                Items
                            </p>
                        </td>
                        <td className='w-1/4'>
                            <p className={`${dmSerifDisplay.className} text-sm font-medium text-gray-900 truncate dark:text-white`}>
                                Quantity
                            </p>
                        </td>
                        <td className='w-1/4'>
                            <p className={`${dmSerifDisplay.className} text-sm font-medium text-gray-900 truncate dark:text-white`}>
                                Price
                            </p>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    {items?.map((item: any, index: number) => (
                        <tr key={index}>
                            <td >
                                <p className={`${dmSerifDisplay.className} text-sm text-gray-500 truncate dark:text-gray-400`}>
                                    {item?.product || item?.name}
                                </p>
                            </td>
                            <td>
                                <p className={`${dmSerifDisplay.className} text-sm text-gray-500 truncate dark:text-gray-400`}>
                                    {item?.qty}
                                </p>
                            </td>
                            <td>
                                <p className={`${dmSerifDisplay.className} text-sm text-gray-500 truncate dark:text-gray-400`}>
                                    Rs. {item?.price}
                                </p>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td >
                            <p className={`${dmSerifDisplay.className} mt-4 text-sm font-medium text-gray-900 truncate dark:text-white`}>
                                Total
                            </p>
                        </td>
                        <td></td>
                        <td>
                            <p className={`${dmSerifDisplay.className} text-sm font-medium text-gray-900 truncate dark:text-white`}>
                                Rs. {order.total}
                            </p>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderedCard;