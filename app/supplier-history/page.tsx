"use client"
import UserCard from '@/components/UserCard'
import { Bitter, DM_Serif_Display } from 'next/font/google'
import React, { useState, useEffect, ChangeEvent, useMemo } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import moment from 'moment'
import dayjs, { Dayjs } from 'dayjs'
import debounce from 'lodash.debounce'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

type Props = {}


const dmSerifDisplay = DM_Serif_Display({
    subsets: ['latin'],
    weight: '400'
})

const bitter = Bitter({
    subsets: ['latin'],
    weight: '400'
})

const SupplierHistory = (props: Props) => {
    const [supplyHistory, setSupplyHistory] = useState<any[]>([]);
    const [error, setError] = useState<any>(null);
    const supabase = createClientComponentClient()

    const today = dayjs();

    const [startDate, setStartDate] = React.useState<Dayjs | null>(today.subtract(7, 'day'));
    const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs());

    const [searchResults, setSearchResults] = useState<any[]>([])

    const [searchText, setSearchText] = useState<string>('')
    const [showSearchResults, setShowSearchResults] = useState<boolean>(false)

    useEffect(() => {
        async function fetchData() {
            try {
                const { data, error } = await supabase
                    .from('supply_history')
                    .select(`*, users (fullname)`).lt('created_at', endDate).gte('created_at', startDate);

                if (error) {
                    setError(error);
                } else {
                    setSupplyHistory(data);
                }
            } catch (error) {
                setError(error);
            }
        }

        fetchData();
    }, []);

    const filterByDateRange = async () => {
        const { data, error } = await supabase.from('supply_history').select('*, users(*)').lt('created_at', endDate).gte('created_at', startDate)
        console.log(data)
        if (!searchText) {
            setShowSearchResults(false)
        }
        if (data) {
            setSupplyHistory(data)
        }
    }

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

    const searchData = async (searchText: string) => {
        if (searchText) {
            const { data, error } = await supabase.from('supply_history').select('*, users(*)').lt('created_at', endDate).gte('created_at', startDate).textSearch('users.fullname', searchText + ':*')
            console.log(data)
            if (data) {
                const filteredData = data.filter((d) => d.users != null)

                setShowSearchResults(true)
                setSearchResults(filteredData)
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

    return (
        <>
            <div className="flex mb-4">
                <div className="w-1/4  h-auto"></div>
                <div className="w-2/4  h-auto flex flex-col items-center">
                    <div className={`font-bold ${dmSerifDisplay.className} text-[48px] text-[#2da74b] mb-2`}>Supplier History</div>
                    <div className="mt-2 mb-4">
                        <input id="search" placeholder='search' name="search" type="text" autoComplete="current-password" onChange={debouncedResults} required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className='flex gap-3 items-center mb-4'>
                            <DatePicker
                                label="Start Date"
                                value={startDate}
                                onChange={(newValue) => setStartDate(newValue)}
                            />
                            <div>-</div>
                            <DatePicker
                                label="End Date"
                                value={endDate}
                                onChange={(newValue) => setEndDate(newValue)}
                            />
                            <div className='bg-[#2da74b] text-white hover:bg-[#255e33] p-2' onClick={filterByDateRange}>Apply</div>
                        </div>
                    </LocalizationProvider>
                    {!showSearchResults && supplyHistory?.map((item, i) => {
                        return (
                            <div key={i} className={`cursor-pointer w-full p-2 mb-1 mt-1 bg-white border border-gray-200 rounded-lg shadow sm:p-4`}>
                                <div className="flow-root">
                                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                        <li className="py-3 sm:py-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-1 min-w-0">
                                                    <p className={`${dmSerifDisplay.className} text-sm font-medium text-gray-900 truncate `}>
                                                        {item?.users.fullname}
                                                    </p>
                                                    <p className={`${dmSerifDisplay.className} text-sm text-green-700 truncate `}>
                                                        {moment(item?.created_at).format('MMMM Do YYYY')}
                                                    </p>
                                                </div>
                                                <div className="flex-1 min-w-0 text-right" >
                                                    <p className={`${dmSerifDisplay.className} text-sm font-medium text-gray-900 truncate `}>
                                                        Price: Rs.{item?.price}.00
                                                    </p>
                                                    <p className={`${dmSerifDisplay.className} text-sm text-green-700 truncate `}>
                                                        Amount: {item?.amount} Kg
                                                    </p>
                                                </div>

                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )
                    })}

                    {showSearchResults && searchResults.map((item: any, index: any) => (
                        <div key={index} className={`cursor-pointer w-full p-2 mb-1 mt-1 bg-white border border-gray-200 rounded-lg shadow sm:p-4`}>
                            <div className="flow-root">
                                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-1 min-w-0">
                                                <p className={`${dmSerifDisplay.className} text-sm font-medium text-gray-900 truncate `}>
                                                    {item?.users.fullname}
                                                </p>
                                                <p className={`${dmSerifDisplay.className} text-sm text-green-700 truncate `}>
                                                    {moment(item?.created_at).format('MMMM Do YYYY')}
                                                </p>
                                            </div>
                                            <div className="flex-1 min-w-0 text-right" >
                                                <p className={`${dmSerifDisplay.className} text-sm font-medium text-gray-900 truncate `}>
                                                    Price: Rs.{item?.price}.00
                                                </p>
                                                <p className={`${dmSerifDisplay.className} text-sm text-green-700 truncate `}>
                                                    Amount: {item?.amount} Kg
                                                </p>
                                            </div>

                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))}
                    {showSearchResults && !searchResults.length && <div className='pt-3'>No Results Found</div>}
                </div>
                <div className="w-1/4  h-auto"></div>
            </div>
        </>
    )
}

export default SupplierHistory