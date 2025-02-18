"use client"

// REACT & NEXT
import Link from "next/link"
// STORE
import { GlobalStore } from "../../store/globalStore"
// ASSETS
import { markazi } from "@/public/fonts"
// TYPES
import { oldSessionComponentPropTypes } from "@/src/types/prop"

export default function OldSessionComponent({language, practice}: oldSessionComponentPropTypes) {

    // GET OLD SESSIONS
    const {OldSessions} = GlobalStore()

    return(

        <>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p className={`${markazi.className} mb-10 text-xl font-normal text-center`}>{OldSessions.length == 0 ? "You Dont Have Any! Create One" : "You Have Session! Create Another One"}</p>
                <Link href={`/create/?language=${language}&practice=${practice}`} passHref>
                    <button
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#007BFF',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Create New Session
                    </button>
                </Link>
            </div>

            {OldSessions.length != 0 ?

                <div className="container max-w-lg rounded-lg mx-auto bg-[#4D5B6C] p-5 mt-5">
                    <div>
                        {OldSessions.map((session, index) => (
                            <Link key={index} href={`/detail/?language=${language}&practice=${practice}&id=${session.oldSessionId}`} passHref>
                                <div 
                                    className="flex justify-between bg-white p-4 mb-3 rounded shadow-sm"
                                    >
                                    <p className="text-black-800">{new Date(session.createdAt).toLocaleString()}</p>
                                    <p className="text-black-600 m-0">Rate: {session.rate}/100</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                : null
            }
        </>
    )
}