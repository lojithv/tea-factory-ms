"use client"
import React, { useEffect, useState } from 'react'
import useUser from '@/hooks/useUser'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Bitter, DM_Serif_Display } from 'next/font/google'
import CartItem from '@/components/CartItem'
import Swal from 'sweetalert2'

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
    const [state, setState] = useState<boolean>(false)

    useEffect(() => {
        if (user && !cartItems.length) {
            supabase.from('carts').select().eq('userid', user?.user.id).then((res) => {
                if (res.data) {
                    setCartItems(res.data)
                }
            })
        }
    }, [user, state])


    const getTotal = () => {
        return cartItems.reduce(add, 0)
    }

    function add(accumulator: any, a: any) {
        return accumulator + (a.price * a.qty);
    }

    const handleOrder = async () => {
        const itemsJson = JSON.stringify(cartItems);
        try {
            const { data, error } = await supabase
                .from('orders')
                .insert([
                    { items: itemsJson, userid: user?.userDetails?.userid, total: getTotal() },
                ])
                .select();

            if (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                    confirmButtonColor: '#2da74b'
                })
            } else {

                const { error } = await supabase
                    .from('carts')
                    .delete()
                    .eq('userid', user?.userDetails?.userid)
                if (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.message,
                        confirmButtonColor: '#2da74b'
                    })
                } else {
                    setState(true)
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Successfully ordered',
                        confirmButtonColor: '#2da74b'
                    })
                }

            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Network error",
                confirmButtonColor: '#2da74b'
            })
        }
    }
    return (
        <div className='flex flex-grow items-center'>
            <div className="flex h-full w-full flex-col items-center justify-start px-10">
                <div className={`font-bold ${dmSerifDisplay.className} text-[48px] text-[#2da74b]`}>Cart</div>

                {cartItems.length > 0 && !state && (
                    <div className='flex flex-col gap-5 p-10'>
                        {cartItems.map((item: {
                            qty: number, product: string; price: any
                        }, i: React.Key | null | undefined) => (
                            <CartItem key={i} name={item.product} price={item.price} quantity={item.qty} />
                        ))}
                    </div>
                )}

                {cartItems.length > 0 && !state && (
                    <div>Total: Rs.{getTotal()}.00</div>
                )}
                {
                    cartItems.length > 0 && !state ? (
                        <div className='flex gap-2 mt-4'>
                            <div className='bg-[#2da74b] hover:bg-[#255e33] text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={handleOrder}>Order</div>
                        </div>
                    ) : (
                        <div className='flex gap-2 mt-4'>
                            <a href='/products' className='bg-[#2da74b] hover:bg-[#255e33] text-white font-bold py-2 px-4 rounded cursor-pointer' >Select Products To Order</a>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default Cart