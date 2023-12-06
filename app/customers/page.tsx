"use client"
import UserCard from '@/components/UserCard'
import { Bitter, DM_Serif_Display } from 'next/font/google'
import React, { useState, useEffect, useMemo, ChangeEvent } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import debounce from 'lodash.debounce'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
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

const Customers = (props: Props) => {
    const [customers, setCustomers] = useState<any>();
    const [error, setError] = useState<any>(null);
    const supabase = createClientComponentClient()

    const [searchResults, setSearchResults] = useState<any[]>([])

    const [searchText, setSearchText] = useState<string>('')
    const [showSearchResults, setShowSearchResults] = useState<boolean>(false)

    const [state, setState] = useState<boolean>(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('usertype', 'customer');

                if (error) {
                    setError(error);
                } else {
                    setCustomers(data);
                }
            } catch (error) {
                setError(error);
            }
        }

        fetchData();
    }, [state]);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

    const searchData = async (searchText: string) => {
        if (searchText) {
            const { data, error } = await supabase.from('users').select().eq('usertype', 'customer').textSearch('fullname', searchText + ':*')
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

    const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log('search text change', e.target.value)
        searchData(e.target.value)
        setSearchText(e.target.value)
    }

    const debouncedResults = useMemo(() => {
        return debounce(handleSearchTextChange, 1000);
    }, []);

    const handleDeleteUser = async (userId: string, value: boolean) => {
        try {
            const { error } = await supabase
                .from('users')
                .update({ isactive: value })
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
                    text: 'Update Successfully',
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
                    <div className={`font-bold ${dmSerifDisplay.className} text-[48px] text-[#2da74b] mb-2`}>Customers</div>

                    <div className="mt-2 mb-4">
                        <input id="search" placeholder='search' name="search" type="text" autoComplete="current-password" onChange={debouncedResults} required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>

                    {(showSearchResults ? searchResults : customers)?.map((user: any, index: any) => (
                        <UserCard key={index} index={index} user={user} isDelete={true} isSupply={true} onDeleteUser={handleDeleteUser} />
                    ))}

                    {showSearchResults && !searchResults.length && <div className='pt-3'>No Results Found</div>}
                </div>
                <div className="w-1/4  h-auto"></div>
            </div>
        </>
    )
}

export default Customers