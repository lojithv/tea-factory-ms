import { AuthContext } from '@/context/AuthContext';
import useUser from '@/hooks/useUser';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image'
import React, { useContext } from 'react'
import Swal from 'sweetalert2';

type Props = {
    image: string;
    name: string;
    price: any;
    user?: any;
    quantity: string;
}

const ProductItem = (props: Props) => {

    const supabase = createClientComponentClient()

    const currentUser = useContext(AuthContext);

    console.log("currentUser==>", currentUser)

    const handleUpdate = async () => {

    }

    const handleDelete = async () => {

    }

    return (
        <div className='w-[250px] h-fit shadow-md rounded-md'>
            <div className={`w-full h-full flex flex-col items-center pb-3 pt-3`}>
                <Image src="/Fertilizer/1- Organic Manure - 5kg - Rs.250.jpg" style={{ height: '200px', width: 'auto' }} alt={''} width={190} height={200} />
                <div> {props.name}</div>
                <div>Rs. {props.price}</div>
                <div>Quantity {props.quantity}</div>
                <div className='flex gap-2 mt-4'>
                    <div className='bg-[#2da74b] hover:bg-[#255e33] text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={handleUpdate}>Update</div>
                    <div className='bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={handleDelete}>Delete</div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem