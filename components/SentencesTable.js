"use client"

import React, { useEffect } from 'react';

export default function SentencesTable ({ sentences }) {

    useEffect(() => {}, [sentences])
    
    return (
        <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Sentences</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Original Text</th>
                        <th className="border border-gray-300 px-4 py-2">User Input</th>
                        <th className="border border-gray-300 px-4 py-2">Translation</th>
                        <th className="border border-gray-300 px-4 py-2">Similarity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {sentences.map((sentence) => (
                        <tr key={sentence.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2 text-center">{sentence.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{sentence.original}</td>
                            <td className="border border-gray-300 px-4 py-2">{sentence.own}</td>
                            <td className="border border-gray-300 px-4 py-2">{sentence.translate}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{(sentence.similarity * 100).toFixed(2)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}