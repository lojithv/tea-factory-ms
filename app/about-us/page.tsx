import { Bitter, DM_Serif_Display } from 'next/font/google'
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

const AboutUs = (props: Props) => {
    return (
        <main className="flex min-h-full flex-col items-center p-24">
            <div className={`font-bold ${dmSerifDisplay.className} text-[48px] text-[#2c666eff]`}>About Us</div>
            <div className={`${bitter.className} px-56 mt-10`}>
                &quot;Priyankara Tea Buyers&quot; is a company who collects tea leaves from suppliers around Thalagaspe,
                Katandola, Kellapatha, Amugoda, and other areas close to Elpitiya and Pitigala. K. W. Ajith
                Priyankara is the owner of this firm. There are 12 employees including an assistant manager, an
                accountant and tea leave collectors. After gathering tea leaves, Priyankara Tea Buyer sells them
                to the company named as &quot;Kellapatha Tea Factory&quot;. In addition to this function, the company
                buy and resell tea powder and fertilizer to their customers. Priyankara Tea Buyer purchases tea
                powder from Elpitiya Plantations, Pundaluoya, and Dicene Garden and they buy fertilizer from
                CIC Holdings PLC and Baur Fertilizer Company. They anticipate continuing to provide good
                service to improve the well-being of tea planters.

            </div>
        </main>
    )
}

export default AboutUs