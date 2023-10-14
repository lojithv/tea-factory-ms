"use client"

import UserCard from '@/components/UserCard'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import debounce from 'lodash.debounce'
import { Bitter, DM_Serif_Display } from 'next/font/google'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect, useMemo, ChangeEvent } from 'react'
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

const Employee = (props: Props) => {

    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNum, setPhoneNum] = useState('')
    const router = useRouter()
    const supabase = createClientComponentClient()
    const [users, setUsers] = useState<any[]>([]);
    const [error, setError] = useState<any>(null);
    const [state, setState] = useState<boolean>(false);

    const [searchResults, setSearchResults] = useState<any[]>([])

    const [searchText, setSearchText] = useState<string>('')
    const [showSearchResults, setShowSearchResults] = useState<boolean>(false)

    useEffect(() => {
        const closePopupOnOutsideClick = (event: any) => {
            if (isOpen && event.target && !event.target.closest('.modal-container')) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', closePopupOnOutsideClick);

        return () => {
            document.removeEventListener('click', closePopupOnOutsideClick);
        };
    }, [isOpen]);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const handleSignUp = async () => {
        if (password !== confirmedPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Passwords do not match",
                confirmButtonColor: '#2da74b'
            })
            return
        }
        await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/`,
                data: { fullName: "test name", address: "test add", phoneNum: "08734234" }
            },
        }).then((res) => {
            console.log(res)
            if (!res.error) {
                supabase.from('users').insert({ userid: res.data.user?.id, fullname: fullName, address: address, phonenumber: phoneNum, usertype: 'employee' }).then((res1) => {
                    if (!res1.error) {
                        setState(!state)
                        togglePopup()
                    }
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.error.message,
                    confirmButtonColor: '#2da74b'
                })
            }
        })
        // router.refresh()
    }
    useEffect(() => {
        fetchData();
    }, [state]);

    async function fetchData() {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('usertype', 'employee');

            if (error) {
                setError(error);
            } else {
                setUsers(data);
            }
        } catch (error) {
            setError(error);
        }
    }

    const searchData = async (searchText: string) => {
        if (searchText) {
            const { data, error } = await supabase.from('users').select().eq('usertype', 'employee').textSearch('fullname', searchText + ':*')
            console.log(data)
            if (data) {
                setShowSearchResults(true)
                setSearchResults(data)
            }
        } else {
            setShowSearchResults(false)
            setSearchResults([])
        }
    }

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

    const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log('search text change', e.target.value)
        searchData(e.target.value)
        setSearchText(e.target.value)
    }

    const debouncedResults = useMemo(() => {
        return debounce(handleSearchTextChange, 1000);
    }, []);

    const handleDeleteEmployee = async (userId: string) => {
        try {
            const { error } = await supabase
                .from('users')
                .delete()
                .eq('userid', userId)

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
                    text: 'Delete Successfully',
                    confirmButtonColor: '#2da74b'
                })
                setState(!state)
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
        <>
            <div className="flex mb-4">
                <div className="w-1/4  h-auto"></div>
                <div className="w-2/4  h-auto flex flex-col items-center">
                    <div className={`font-bold ${dmSerifDisplay.className} text-[48px] text-[#2da74b] mb-2`}>Employees</div>
                    <div className="mt-2">
                        <input id="search" placeholder='search' name="search" type="text" autoComplete="current-password" onChange={debouncedResults} required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <div className='flex mt-2'>
                        <button
                            onClick={togglePopup}
                            className={`${dmSerifDisplay.className} mb-4 bg-[#2da74b] hover:bg-[#2da74b]-700 text-white font-bold py-2 px-4 rounded`}
                        >
                            Add new employee
                        </button>
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
                                                <h2 className={`text-center text-2xl font-bold leading-9 tracking-tight ${dmSerifDisplay.className} text-[#2da74b]`}>Add new employee</h2>
                                            </div>

                                            <div className={`mt-10 sm:mx-auto sm:w-full sm:max-w-sm ${bitter.className}`}>
                                                <div className="space-y-6">
                                                    <div>
                                                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                                                        <div className="mt-2">
                                                            <input id="name" name="name" type="text" onChange={(e) => setFullName(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                                        <div className="mt-2">
                                                            <input id="email" name="email" type="email" autoComplete="email" required onChange={(e) => setEmail(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div className="flex items-center justify-between">
                                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                                        </div>
                                                        <div className="mt-2">
                                                            <input id="password" name="password" type="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div className="flex items-center justify-between">
                                                            <label htmlFor="confirmpassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                                                        </div>
                                                        <div className="mt-2">
                                                            <input id="confirmpassword" name="confirmpassword" type="password" onChange={(e) => setConfirmedPassword(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div className="flex items-center justify-between">
                                                            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">Address</label>
                                                        </div>
                                                        <div className="mt-2">
                                                            <input id="address" name="address" type="text" required onChange={(e) => setAddress(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div className="flex items-center justify-between">
                                                            <label htmlFor="phonenum" className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                                                        </div>
                                                        <div className="mt-2">
                                                            <input id="phonenum" name="phonenum" type="number" required onChange={(e) => setPhoneNum(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <button onClick={handleSignUp} className="flex w-full justify-center rounded-md bg-[#2da74b] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#24555c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#285d64]">Add employee</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {(showSearchResults ? searchResults : users)?.map((user: any, index: any) => (
                        <UserCard key={index} index={index} user={user} isDelete={true} onDeleteUser={handleDeleteEmployee} />
                    ))}

                    {showSearchResults && !searchResults.length && <div>No Results Found</div>}
                </div>
                <div className="w-1/4  h-auto"></div>
            </div>
        </>
    )
}


export default Employee