import { Mail, MapPin, Phone, UserCircle2 } from 'lucide-react'
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

        <div className="flex flex-grow items-center">
            <div className='w-1/2 h-full flex items-center justify-center'>
                <div className="w-1/2 h-1/2 bg-[url('/tea-leaf-about.jpeg')] bg-cover "></div>
            </div>
            <div className="flex h-full w-1/2 flex-col items-start justify-center px-10">
                <div className={`font-bold ${dmSerifDisplay.className} text-[48px] text-[#2da74b]`}>Contact Us</div>
                <div className={`${bitter.className} mt-10`}>
                    <div className='flex font-bold gap-2'><MapPin />Address:</div>
                    <div>
                        &quot;Priyankara Tea Buyer Company&quot; <br />
                        Ketandola,<br />
                        Thalagaspe,<br />
                        Elpitiya
                    </div>
                    <div className='flex font-bold mt-5 gap-2'><UserCircle2 />Owner:</div>
                    <div>
                        K.W. Ajith Priyankara
                    </div>
                    <div className='flex font-bold mt-5 gap-2'><Phone />Contact:</div>
                    <div>
                        091 2254301
                    </div>
                    <div className='flex font-bold mt-5 gap-2'><Mail />Email:</div>
                    <div>
                        priyatea33@gmail.com
                    </div>



                </div>
            </div>

        </div>

    )
}

export default ContactUs