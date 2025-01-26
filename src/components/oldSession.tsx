"use client"

import Link from "next/link";
//STORE
import { GlobalStore } from "../store/globalStore";
import { markazi } from "@/public/fonts";

export default function OldSessionComponent({language, practice}: any) {

    // GET OLD SESSIONS
    const {OldSessions} = GlobalStore();

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
                            <Link href={`/detail/?id=${session.id}`} passHref>
                                <div 
                                    key={index}
                                    className="flex justify-between bg-white p-4 mb-3 rounded shadow-sm"
                                    >
                                    <p className="text-gray-800">{session.createdOn}</p>
                                    <p className="text-gray-600 m-0">Rate: {session.rate}/100</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                : null
            }
        </>

    );
}


