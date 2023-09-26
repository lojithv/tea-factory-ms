"use client"
import { Bitter, DM_Serif_Display } from 'next/font/google'
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Product from '@/components/Product'
import ProductItem from '@/components/ProductItem'

type Props = {}

const dmSerifDisplay = DM_Serif_Display({
    subsets: ['latin'],
    weight: '400'
})

const bitter = Bitter({
    subsets: ['latin'],
    weight: '400'
})

function ManageProducts({ }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [quantity, setQuantity] = useState('')
    const router = useRouter()
    const supabase = createClientComponentClient()
    const [users, setUsers] = useState<any>();
    const [fertilizer, setFertilizer] = useState<any>();
    const [teaPowder, setTeaPowder] = useState<any>();
    const [error, setError] = useState<any>(null);
    const [state, setState] = useState<boolean>(false);
    const [selectedTab, setSelectedTab] = useState(1)

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

    // const fertilizer = [
    //     { path: "/Fertilizer/1- Organic Manure - 5kg - Rs.250.jpg", name: "Organic Manure - 5kg", price: 250 },
    //     { path: "/Fertilizer/2- Organic Manure - 10kg - Rs.500.jpg", name: "Organic Manure - 10kg", price: 500 },
    //     { path: "/Fertilizer/3-Dolamite - 10kg - Rs.500.jpg", name: "Dolamite - 10kg", price: 500 },
    //     { path: "/Fertilizer/4- T-65 - 50kg - Rs.1500.png", name: "T-65 - 50kg", price: 1500 },
    //     { path: "/Fertilizer/5-T-200 - 50kg - Rs.1500.png", name: "T-200 - 50kg", price: 1500 },
    //     { path: "/Fertilizer/6- U-709 - 50kg - Rs.1500.png", name: "U-709 - 50kg", price: 1500 },
    //     { path: "/Fertilizer/7- T-65 - 10kg- Rs.300.jpg", name: "T-65 - 10kg", price: 300 },
    //     { path: "/Fertilizer/8- T-200 - 10kg - Rs.300.jpg", name: "T-200 - 10kg", price: 300 },
    //     { path: "/Fertilizer/9- U-709 - 10kg-Rs.300.jpg", name: "U-709 - 10kg", price: 300 },
    //     { path: "/Fertilizer/10- UT-752 - 10kg- Rs.300.jpg", name: "UT-752 - 10kg", price: 300 },
    // ]
    // const teaPowder = [
    //     { path: "/Tea Powder/1-Evergreen Tea Powder - 400g - Rs.650.jpg", name: "Evergreen Tea Powder - 400g", price: 650 },
    //     { path: "/Tea Powder/2- Evergreen Brombil Tea - 400g - Rs.790.jpg", name: "Evergreen Brombil Tea - 400g", price: 790 },
    //     { path: "/Tea Powder/3- Evergreen Tea Powder - 1kg - Rs.1600.jpg", name: "Evergreen Tea Powder - 1kg", price: 1600 },
    //     { path: "/Tea Powder/4- Evergreen Tea Powder - 2kg - Rs.3100.jpg", name: "Evergreen Tea Powder - 2kg", price: 3100 },
    // ]
    const handleAddProduct = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .insert([
                    { image: image, name: name, price: price, quantity: quantity, type: type },
                ])
                .select();

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
                    text: 'Successfully Added',
                    confirmButtonColor: '#2da74b'
                })
                setState(!state)
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
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')

                if (error) {
                    setError(error);
                } else {
                    setFertilizer(data?.filter(obj => obj.type === "fertiliser"));
                    setTeaPowder(data?.filter(obj => obj.type === "teapowder"));
                    console.log("data===>", data)
                }
            } catch (error) {
                setError(error);
            }
        }

        fetchData();
    }, [state]);
    return (
        <>
            <div className='flex flex-grow items-center'>
                <div className="flex h-full w-full flex-col items-center justify-start px-10">
                    <div className={`font-bold ${dmSerifDisplay.className} text-[48px] text-[#2da74b]`}>Manage Products</div>
                    <div className='flex mt-2'>
                        <button
                            onClick={togglePopup}
                            className={`${dmSerifDisplay.className} mb-4 bg-[#2da74b] hover:bg-[#2da74b]-700 text-white font-bold py-2 px-4 rounded`}
                        >
                            Add new product
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
                                                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Upload Image Url</label>
                                                        <div className="mt-2">
                                                            <input id="image" name="image" type="text" onChange={(e) => setImage(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                                        <div className="mt-2">
                                                            <input id="name" name="name" type="text" autoComplete="email" required onChange={(e) => setName(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center justify-between">
                                                            <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">
                                                                Quantity
                                                            </label>
                                                        </div>
                                                        <div className="mt-2">
                                                            <select
                                                                id="quantity"
                                                                name="quantity"
                                                                onChange={(e) => setType(e.target.value)}
                                                                required
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            >
                                                                <option value="fertiliser">fertiliser</option>
                                                                <option value="teapowder">teapowder</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div className="flex items-center justify-between">
                                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Price</label>
                                                        </div>
                                                        <div className="mt-2">
                                                            <input id="price" name="price" type="number" autoComplete="current-password" onChange={(e) => setPrice(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div className="flex items-center justify-between">
                                                            <label htmlFor="confirmpassword" className="block text-sm font-medium leading-6 text-gray-900">Quantity</label>
                                                        </div>
                                                        <div className="mt-2">
                                                            <input id="quantity" name="quantity" type="number" onChange={(e) => setQuantity(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <button onClick={handleAddProduct} className="flex w-full justify-center rounded-md bg-[#2da74b] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#24555c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#285d64]">Add product</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='flex'>
                        <div dir="ltr" onClick={() => setSelectedTab(1)}><div className={`rounded-s-lg ${selectedTab == 1 ? 'bg-[#255e33]' : 'bg-[#2da74b]'} hover:bg-[#327e45] cursor-pointer text-white p-3 min-w-[150px] text-center`}>Fertilizer</div></div>
                        <div dir="rtl" onClick={() => setSelectedTab(2)}><div className={`rounded-s-lg ${selectedTab == 2 ? 'bg-[#255e33]' : 'bg-[#2da74b]'} hover:bg-[#327e45] cursor-pointer text-white p-3 min-w-[150px] text-center`}>Tea Powder</div></div>
                    </div>
                    {selectedTab == 1 && (
                        <div className='flex flex-wrap gap-5 justify-center p-10'>
                            {fertilizer?.map((item: any, i: any) => (
                                <ProductItem key={i} image={item.path} name={item.name} price={item.price} quantity={item.quantity} />
                            ))}
                        </div>
                    )}
                    {selectedTab == 2 && (
                        <div className='flex flex-wrap gap-5 justify-center p-10'>
                            {teaPowder?.map((item: any, i: any) => (
                                <ProductItem key={i} image={item.path} name={item.name} price={item.price} quantity={item.quantity} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ManageProducts