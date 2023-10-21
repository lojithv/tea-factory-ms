

import React, { useState } from 'react';
import { Bitter, DM_Serif_Display } from 'next/font/google'

import useUser from '@/hooks/useUser'
import Swal from 'sweetalert2'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation';

const dmSerifDisplay = DM_Serif_Display({
    subsets: ['latin'],
    weight: '400'
})

const bitter = Bitter({
    subsets: ['latin'],
    weight: '400'
})
interface UserProps {
    user: any;
    index: number;
    isDelete: boolean;
    isSupply?: boolean;
    onDeleteUser?: (data: string) => void;
}
const UserCard: React.FC<UserProps> = ({ user, index, isDelete, onDeleteUser, isSupply }) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const LoggedUser = useUser()
    const [isOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState('')
    const [price, setPrice] = useState('')
    const supabase = createClientComponentClient()
    const router = useRouter();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const handleClickCard = (userId: any) => {
        if (!isDelete) {
            localStorage.setItem('ClickedUserId', userId);
        }
    }
    const sendDeleteUserId = (userId: any) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                if (onDeleteUser)
                    onDeleteUser(userId);
            }
        })

    };
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    const handleNavigate = () => {
        router.push((user.usertype == 'customer' ? '/customer-details/' : '/single-tea-collector/') + user.userid)
        // window.location.href = (user.usertype == 'customer' ? '/customer-details/' : '/single-tea-collector/') + user.userid;
    }
    const handleAddCustomerSupply = async (userId: string) => {
        if (amount && price) {
            try {
                const { data, error } = await supabase
                    .from('supply_history')
                    .insert([
                        { customer_id: userId, amount: amount, price: price },
                    ])
                    .select();

                if (error) {
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
                    togglePopup()
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Network error",
                    confirmButtonColor: '#2da74b'
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Please fill the all data",
                confirmButtonColor: '#2da74b'
            })
        }
    }
    return (
        <div onClick={() => handleClickCard(user?.userid)} key={index} className={`cursor-pointer w-full p-2 mb-1 mt-1 bg-white border border-gray-200 rounded-lg shadow sm:p-4`}>
            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-1 min-w-0" onClick={() => handleNavigate()}>
                                <p className={`${dmSerifDisplay.className} text-sm font-medium text-gray-900 truncate `}>
                                    {user?.fullname}
                                </p>
                                {/* <p className={`${dmSerifDisplay.className} text-sm text-green-700 truncate `}>
                                    {user?.userid}
                                </p> */}
                            </div>
                            <div className="flex-1 min-w-0" onClick={() => handleNavigate()}>
                                <p className={`${dmSerifDisplay.className} text-sm font-medium text-gray-900 truncate `}>
                                    {user?.address}
                                </p>
                                <p className={`${dmSerifDisplay.className} text-sm text-green-700 truncate `}>
                                    {user?.phonenumber}
                                </p>
                            </div>
                            {
                                isDelete && (
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                        <button onClick={() => sendDeleteUserId(user?.userid)} className={`${dmSerifDisplay.className} bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full`}>
                                            Delete
                                        </button>
                                    </div>
                                )
                            }
                            {
                                isSupply &&
                                (
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                        <button onClick={togglePopup} className={`${dmSerifDisplay.className} bg-green-500 hover:bg-[#24555c] text-white font-bold py-2 px-4 rounded-full`}>
                                            Add supply
                                        </button>
                                    </div>
                                )
                            }

                        </div>
                    </li>
                </ul>
            </div>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                        <div className="modal-content py-4 text-left px-6">
                            <div className="flex justify-between items-center ">
                                <span></span>
                                <button
                                    onClick={togglePopup}
                                    className="modal-close cursor-pointer z-50"
                                >
                                    <svg
                                        className="fill-current text-[#2da74b]"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                    >
                                        <path
                                            d="M1 1L17 17M1 17L17 1"
                                            stroke="#000"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex flex-grow flex-col justify-center px-6 py-6 lg:px-8">
                                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                    <h2 className={`text-center text-2xl font-bold leading-9 tracking-tight ${dmSerifDisplay.className} text-[#2da74b]`}>Add Customer Supply</h2>
                                </div>

                                <div className={`mt-10 sm:mx-auto sm:w-full sm:max-w-sm ${bitter.className}`}>
                                    <div className="space-y-6">

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Price (Rs.)</label>
                                            <div className="mt-2">
                                                <input id="name" name="name" type="number" autoComplete="name" required onChange={(e) => setPrice(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Amount (kg)</label>
                                            </div>
                                            <div className="mt-2">
                                                <input id="price" name="price" type="number" autoComplete="current-password" onChange={(e) => setAmount(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                            </div>
                                        </div>

                                        <div>
                                            <button onClick={() => handleAddCustomerSupply(user?.userid)} className="flex w-full justify-center rounded-md bg-[#2da74b] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#24555c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#285d64]">Add Supply</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserCard;