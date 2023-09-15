import Image from 'next/image'
import React from 'react'

type Props = {
    image: string;
    name: string;
    price: string;
}

const Product = (props: Props) => {
    return (
        <div className='w-[250px] h-fit shadow-md rounded-md'>
            <div className={`w-full h-full flex flex-col items-center pb-3 pt-3`}>
                <Image src={props.image} style={{ height: '200px', width: 'auto' }} alt={''} width={190} height={200} />
                <div> {props.name}</div>
                <div>{props.price}</div>
                <div className='bg-[#2da74b] hover:bg-[#255e33] text-white font-bold py-2 px-4 rounded'>Add To Cart</div>
            </div>
        </div>
    )
}

export default Product