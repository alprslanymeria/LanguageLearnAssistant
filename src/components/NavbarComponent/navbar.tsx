// REACT & NEXT
import Link from 'next/link'
// ASSETS
import {Fonts} from '@/public/fonts/fonts'
// COMPONENTS
import { EmailComponent } from '@/src/components/EmailComponent/email'
import { MenuComponent } from '@/src/components/MenuComponent/menu'


export default async function NavbarComponent() {

    return (

        <nav className="bg-[#F4CC15] px-5 py-5 my-5 rounded-lg">
            <div className="flex flex-wrap items-center justify-between">

                <Link href={"/"}>
                    <p className={`text-sm sm:text-lg md:text-2xl font-normal tracking-widest text-black text-left ${Fonts.neuton.className}`}>
                        LANGUAGE LEARN ASSISTANT
                    </p>
                </Link>

                <div className='hidden md:block'>
                    <EmailComponent/>
                </div>

                <div className='md:hidden'>
                    <MenuComponent/>
                </div>
            </div>
        </nav>
    )
}