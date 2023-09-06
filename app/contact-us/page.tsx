import { DM_Serif_Display, Bitter } from 'next/font/google'
import React from 'react'

type Props = {}

const dmSerifDisplay = DM_Serif_Display({
    subsets: ['latin'],
    weight: '400'
})

const bitter = Bitter({
    subsets: ['latin'],
    weight: '400'
})

const ContactUs = (props: Props) => {
    return (
        <div className="flex flex-grow flex-col items-center p-24">
            <div className={`font-bold ${dmSerifDisplay.className} text-[48px] text-[#2da74b]`}>Contact Us</div>
            <div className={`${bitter.className} px-56 mt-10`}>
                <div>
                    &quot;Priyankara Tea Buyer Company&quot; <br />
                    Ketandola,<br />
                    Thalagaspe,<br />
                    Elpitiya
                </div>

                <div className='mt-5'>
                    Owner: K.W. Ajith Priyankara<br />
                    Contact: 091 2254301<br />
                    Email: priyatea33@gmail.com
                </div>


            </div>
        </div>
    )
}

export default ContactUs