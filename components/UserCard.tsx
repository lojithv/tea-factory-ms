import React, { useState } from 'react';
import { Bitter, DM_Serif_Display } from 'next/font/google'

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
}
const UserCard: React.FC<UserProps> = ({ user, index }) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div key={index} className=" w-full p-2 mb-1 mt-1 bg-white border border-gray-200 rounded-lg shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700">
            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-1 min-w-0">
                                <p className={`${dmSerifDisplay.className} text-sm font-medium text-gray-900 truncate dark:text-white`}>
                                    {user?.fullname}
                                </p>
                                <p className={`${dmSerifDisplay.className} text-sm text-gray-500 truncate dark:text-gray-400`}>
                                    {user?.userid}
                                </p>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={`${dmSerifDisplay.className} text-sm font-medium text-gray-900 truncate dark:text-white`}>
                                    {user?.address}
                                </p>
                                <p className={`${dmSerifDisplay.className} text-sm text-gray-500 truncate dark:text-gray-400`}>
                                    {user?.phonenumber}
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                <button className={`${dmSerifDisplay.className} bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full`}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default UserCard;