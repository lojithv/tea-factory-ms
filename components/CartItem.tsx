import React from 'react'

type Props = {
    name: string;
    price: any;
}

const CartItem = (props: Props) => {
    return (
        <div>
            {props.name} - Rs. {props.price}.00
        </div>
    )
}

export default CartItem