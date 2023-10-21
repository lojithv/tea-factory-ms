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
    id: string;
    type: string;
    instock: boolean;
    onUpdateProduct: (image: string, name: string, price: string, quantity: string, type: string, id: string) => void;
    onAvailabilityUpdate: (id: string, newValue: boolean) => void;
}

const ProductItem = (props: Props) => {

    const supabase = createClientComponentClient()

    const currentUser = useContext(AuthContext);

    console.log("currentUser==>", currentUser)

    const sendUpdateData = () => {
        props.onUpdateProduct(props.image, props.name, props.price, props.quantity, props.type, props.id);
    };

    const sendAvailabilityData = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        }).then((result) => {
            if (result.isConfirmed) {
                props.onAvailabilityUpdate(props.id, !props.instock);
                // Swal.fire(
                //     'Deleted!',
                //     'Your file has been deleted.',
                //     'success'
                // )
            }
        })
    }

    return (
        <div className='w-[250px] h-fit shadow-md rounded-md'>
            <div className={`w-full h-full flex flex-col items-center pb-3 pt-3`}>
                <Image src={props.image} style={{ height: '200px', width: 'auto' }} alt={''} width={190} height={200} />
                <div> {props.name}</div>
                <div>Rs. {props.price}.00</div>
                <div>Quantity {props.quantity}</div>
                <div className='flex gap-2 mt-4'>
                    <div onClick={sendUpdateData} className='bg-[#2da74b] hover:bg-[#255e33] text-white font-bold py-2 px-4 rounded cursor-pointer'>Update</div>
                    <div onClick={sendAvailabilityData} className={`${!props.instock ? 'bg-green-600 hover:bg-green-800' : 'bg-red-600 hover:bg-red-800'} text-white font-bold py-2 px-4 rounded cursor-pointer`}>{!props.instock ? 'Mark In Stock' : 'Mark Out Stock'}</div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem