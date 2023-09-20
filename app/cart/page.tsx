"use client"
import React, { useEffect, useState } from 'react'
import useUser from '@/hooks/useUser'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Bitter, DM_Serif_Display } from 'next/font/google'
import CartItem from '@/components/CartItem'

const dmSerifDisplay = DM_Serif_Display({
    subsets: ['latin'],
    weight: '400'
})

const bitter = Bitter({
    subsets: ['latin'],
    weight: '400'
})

type Props = {}

function Cart({ }: Props) {
    const supabase = createClientComponentClient()

    const user = useUser()

    const [cartItems, setCartItems] = useState([] as any[])

    useEffect(() => {
        if (user) {
            supabase.from('carts').select().eq('userid', user?.user.id).then((res) => {
                if (res.data) {
                    console.log(res)
                    setCartItems(res.data)
                }
            })
        }
    }, [])


    const getTotal = () => {
        return cartItems.reduce(add, 0)
    }

    function add(accumulator: any, a: any) {
        return accumulator + a.price;
    }

    return (
        <div className='flex flex-grow items-center'>
            <div className="flex h-full w-full flex-col items-center justify-start px-10">
                <div className={`font-bold ${dmSerifDisplay.className} text-[48px] text-[#2da74b]`}>Products</div>

                {cartItems.length && (
                    <div className='flex flex-col gap-5 p-10'>
                        {cartItems.map((item: { product: string; price: any }, i: React.Key | null | undefined) => (
                            <CartItem key={i} name={item.product} price={item.price} />
                        ))}
                    </div>
                )}

                {cartItems.length && (
                    <div>Total: {getTotal()}</div>
                )}

            </div>
        </div>
    )
}

export default Cart