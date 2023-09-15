import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image'
import React from 'react'
import Swal from 'sweetalert2';

type Props = {
    image: string;
    name: string;
    price: string;
    user: any;
}

const Product = (props: Props) => {

    const handleAddToCart = async () => {
        if (!props.user) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Sign in is required!",
                confirmButtonColor: '#2da74b'
            })
        }
    }

    return (
        <div className='w-[250px] h-fit shadow-md rounded-md'>
            <div className={`w-full h-full flex flex-col items-center pb-3 pt-3`}>
                <Image src={props.image} style={{ height: '200px', width: 'auto' }} alt={''} width={190} height={200} />
                <div> {props.name}</div>
                <div>{props.price}</div>
                <div className='bg-[#2da74b] hover:bg-[#255e33] text-white font-bold py-2 px-4 rounded' onClick={handleAddToCart}>Add To Cart</div>
            </div>
        </div>
    )
}

export default Product