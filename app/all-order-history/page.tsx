"use client"
import OrderedCard from '@/components/OrderedCard'
import { Bitter, DM_Serif_Display } from 'next/font/google'
import useUser from '@/hooks/useUser'
import React, { useState, useEffect, ChangeEvent, useMemo } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import debounce from 'lodash.debounce'

type Props = {}

const dmSerifDisplay = DM_Serif_Display({
    subsets: ['latin'],
    weight: '400'
})

const bitter = Bitter({
    subsets: ['latin'],
    weight: '400'
})

const AllOrderHistory = (props: Props) => {
    const supabase = createClientComponentClient()
    const [orders, setOrders] = useState([] as any[])
    const [error, setError] = useState<any>(null);
    const user = useUser()

    const today = dayjs();

    const [startDate, setStartDate] = React.useState<Dayjs | null>(today.subtract(7, 'day'));
    const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs());

    const [searchResults, setSearchResults] = useState<any[]>([])

    const [searchText, setSearchText] = useState<string>('')
    const [showSearchResults, setShowSearchResults] = useState<boolean>(false)

    useEffect(() => {
        if (!orders.length) {
            supabase.from('orders').select('*, users(*)').eq('status', 'completed').then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setOrders(res.data)
                }
            })
        }
    }, [])

    const filterByDateRange = async () => {
        const { data, error } = await supabase.from('orders').select('*, users(*)').lt('created_at', endDate).gte('created_at', startDate).eq('status', 'completed')
        console.log(data)
        if (!searchText) {
            setShowSearchResults(false)
        }
        if (data) {
            setOrders(data)
        }
    }

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

    const searchData = async (searchText: string) => {
        if (searchText) {
            const { data, error } = await supabase.from('orders').select('*, users(*)').eq('status', 'completed').lt('created_at', endDate).gte('created_at', startDate).textSearch('users.fullname', searchText + ':*')
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
                    <div className={`font-bold ${dmSerifDisplay.className} text-[48px] text-[#2da74b] mb-2`}>Order History</div>
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
                            <div onClick={filterByDateRange}>Apply</div>
                        </div>
                    </LocalizationProvider>
                    {!showSearchResults && orders.map((item: any, index: any) => (
                        <OrderedCard order={item} index={index} key={index} />
                    ))}

                    {showSearchResults && searchResults.map((item: any, index: any) => (
                        <OrderedCard order={item} index={index} key={index} />
                    ))}
                    {showSearchResults && !searchResults.length && <div className='pt-3'>No Results Found</div>}
                </div>
            </div>
        </>
    )
}

export default AllOrderHistory