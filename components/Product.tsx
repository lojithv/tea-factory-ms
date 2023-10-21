import { AuthContext } from '@/context/AuthContext';
import useUser from '@/hooks/useUser';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2';

type Props = {
    image: string;
    name: string;
    price: any;
    user?: any;
}

const Product = (props: Props) => {

    const supabase = createClientComponentClient()

    const currentUser = useContext(AuthContext);

    const [quantity, setQuantity] = useState(1)

    const handleAddToCart = async () => {
        if (!currentUser) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Sign in is required!",
                confirmButtonColor: '#2da74b'
            })
        } else {
            supabase.from('carts').insert({ userid: currentUser.user.id, product: props.name, price: props.price, qty: quantity }).then((res) => {
                console.log(res.data)
                Swal.fire("Added to Cart!", "", 'success')
                setQuantity(1)
            })
        }
    }

    return (
        <div className='w-[250px] h-fit shadow-md rounded-md'>
            <div className={`w-full h-full flex flex-col items-center pb-3 pt-3`}>
                <Image src={props.image} style={{ height: '200px', width: 'auto' }} alt={''} width={190} height={200} />
                <div> {props.name}</div>
                <div>Rs. {props.price}.00</div>

                <div className="custom-number-input h-10 w-32 mb-3">
                    <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                        <button onClick={() => setQuantity((q) => q > 1 ? q - 1 : q)} className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                            <span className="m-auto text-2xl font-thin">−</span>
                        </button>
                        <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number"></input>
                        <button onClick={() => setQuantity((q) => q + 1)} className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                            <span className="m-auto text-2xl font-thin">+</span>
                        </button>
                    </div>
                </div>
                <div className='bg-[#2da74b] hover:bg-[#255e33] text-white font-bold py-2 px-4 rounded' onClick={handleAddToCart}>Add To Cart</div>
            </div>
        </div>
    )
}

export default Product 