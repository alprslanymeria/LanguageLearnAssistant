//ASSETS
import {neuton} from '@/public/fonts'
//COMPONENTS
import { Email } from './email'
import { HamburgerMenu } from './hamurgerMenu'
//NEXT AUTH
import { auth } from '@/src/Auth'


export async function Navbar() {

    //SESSION ÜZERİNDEN KULLANCII BİLGİLERİ ALINIR
    const session = await auth()
    const email : string | undefined | null = session?.user?.email
    const userId: string | undefined | null = session?.user?.userId

    return (

        <nav className="bg-[#F4CC15] px-5 py-5 my-5 rounded-lg">
            <div className="flex flex-wrap items-center justify-between">
                <p className={`text-sm sm:text-lg md:text-2xl font-normal tracking-widest text-black text-left ${neuton.className}`}>
                    LANGUAGE LEARN ASSISTANT
                </p>

                <div className='hidden md:block'>
                    <Email email={email} userId={userId}></Email>
                </div>

                <div className='md:hidden'>
                    <HamburgerMenu email={email} userId={userId}></HamburgerMenu>
                </div>
            </div>
        </nav>
    )
}