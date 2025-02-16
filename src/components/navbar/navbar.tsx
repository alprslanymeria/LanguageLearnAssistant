//ASSETS
import {neuton} from '@/public/fonts'
//COMPONENTS
import { EmailComponent } from './email'
import { MenuComponent } from './menu'
//NEXT AUTH
import { auth } from '@/src/Auth'


export async function NavbarComponent() {

    //SESSION ÜZERİNDEN KULLANCII BİLGİLERİ ALINIR
    const session = await auth()
    const email  = session?.user?.email
    const userId = session?.user?.userId

    return (

        <nav className="bg-[#F4CC15] px-5 py-5 my-5 rounded-lg">
            <div className="flex flex-wrap items-center justify-between">
                <p className={`text-sm sm:text-lg md:text-2xl font-normal tracking-widest text-black text-left ${neuton.className}`}>
                    LANGUAGE LEARN ASSISTANT
                </p>

                <div className='hidden md:block'>
                    <EmailComponent email={email} userId={userId}/>
                </div>

                <div className='md:hidden'>
                    <MenuComponent email={email} userId={userId}/>
                </div>
            </div>
        </nav>
    )
}