import React from 'react'

type Props = {
    name: string;
    price: any;
}

const CartItem = (props: Props) => {
    return (
        <div>
            {props.name} - Rs. {props.price}
        </div>
    )
}

export default CartItem