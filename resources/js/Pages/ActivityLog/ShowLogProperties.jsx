import { useEffect, useState } from "react";
import { LuEdit, LuFileJson2 } from "react-icons/lu";
import { JsonViewer } from '@textea/json-viewer'

export default function ShowLogProperties({ selectedLogProperties, setSelectedLogProperties }) {
    return (
        <>
            <div onClick={() => setSelectedLogProperties(undefined)} className={`${selectedLogProperties != undefined ? 'bg-opacity-30' : 'bg-opacity-0 pointer-events-none'} fixed inset-0 bg-black transition-all duration-150 z-20`}></div>
            <div className={`${selectedLogProperties != undefined ? '' : 'translate-y-5 opacity-0 pointer-events-none'} transform transition-all duration-150 ease-in fixed inset-0 flex items-center justify-center z-20 pointer-events-none backdrop-blur-sm font-normal `}>
                <div className={`${selectedLogProperties != undefined ? 'pointer-events-auto' : 'pointer-events-none'} bg-white w-[90%] sm:w-[85%] md:w-1/2 lg:w-[75%] rounded-2xl p-4 max-h-[90vh] overflow-y-auto text-sm shadow-xl overscroll-contain`}>
                    <JsonViewer value={selectedLogProperties} />
                </div>
            </div>
        </>
    )
}
