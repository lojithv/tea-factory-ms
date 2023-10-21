import React from 'react'

type Props = {
    name: string;
    price: any;
    quantity: number;
}

const CartItem = (props: Props) => {
    return (
        <div>
            {props.name} - Rs. {props.price}.00 (Quantity - {props.quantity})
        </div>
    )
}

export default CartItem