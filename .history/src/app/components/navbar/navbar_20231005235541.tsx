"use client"

import { FaPizzaSlice, FaBars, FaCar } from "react-icons/fa"
import { BsX } from "react-icons/bs"
import Button from "../generic/button"
import { useState } from "react"
import Link from "next/link"


export default function NavBar(){
    const [showMobile, setShowMobile] = useState(false)

    return(
        <div className="bg-black/80 sticky top-0 z-20 backdrop-blur-xl">
            <div className="w-full flex bg-slate-700/50 ">
                <div className="p-3 m-auto w-full flex max-w-7xl justify-between items-center">
                    <Link href="/">
                    <div className="flex gap-1 h-fit select-none cursor-pointer active:opacity-80 hover:border-b-2 hover:pb-1 active:pb-0 
                            border-opacity-0 border-vermilion-400 hover:border-opacity-100 border-b-0 transition-all">
                        <FaCar className="h-full w-8 fill-vermilion-400"/>
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-vermilion-400 to-vermilion-500">RentTesla.es</h1>
                    </div>
                    </Link>
                    <div className="hidden text-lg gap-4 md:flex">
                        <Button className="text-white bg-transparent active:bg-slate-100/5 hover:bg-slate-100/5 shadow-black/40 hover:shadow-md active:opacity-80" 
                            onClick={undefined}>
                            Locations
                        </Button>
                        <Button className="text-white bg-transparent active:bg-slate-100/5 hover:bg-slate-100/5 shadow-black/40 hover:shadow-md active:opacity-80" 
                            onClick={undefined}>
                            Bookings
                        </Button>
                        <Button className="text-white bg-vermilion-400 shadow-black/40 hover:shadow-md" 
                            onClick={undefined}>
                            Sign In
                        </Button>
                        <Button className="text-white bg-transparent capitalize border-2 border-white/50 hover:border-vermilion-400 hover:text-vermilion-400 
                            active:opacity-80 shadow-black/40 hover:shadow-md" 
                            onClick={undefined}>
                            Sign Up
                        </Button>
                    </div>
                    <div className="md:hidden">
                        <FaBars className="h-10 w-10 fill-white cursor-pointer hover:fill-vermilion-400 active:opacity-80" onClick={() => setShowMobile(true)}/>
                    </div>
                    <div className={`${showMobile ? "" : "translate-x-full"} absolute w-screen h-screen bg-black left-0 top-0 md:hidden transition-all z-50 ease-in-out`}>
                    <div id="mobile-header" className="flex flex-row-reverse w-full"> 
                        <BsX className="fill-white w-16 h-16 cursor-pointer hover:fill-vermilion-400" onClick={() => setShowMobile(false)}/>
                    </div>
                    <div id="mobile-body" className="p-8">
                    <Button className="text-white w-full mt-5 mr-0 ml-auto text-xl bg-slate-600/80 hover:bg-slate-600/90 active:opacity-80 shadow-black/40 hover:shadow-md
                        justify-center" 
                        onClick={undefined}>
                        Locations
                    </Button>
                    <Button className="text-white w-full mt-5 mr-0 ml-auto text-xl bg-slate-600/80 hover:bg-slate-600/90 active:opacity-80 shadow-black/40 hover:shadow-md
                        justify-center" 
                        onClick={undefined}>
                        Bookings
                    </Button>
                    <Button className="text-white w-full mt-5 mr-0 ml-auto text-xl bg-blue-500/80 hover:bg-blue-500/90 active:opacity-80 shadow-black/40 hover:shadow-md
                        justify-center" 
                        onClick={undefined}>
                        Sign In
                    </Button>
                    <Button className="text-white w-full mt-5 mr-0 ml-auto text-xl outline outline-2 outline-white/50 bg-transparent hover:bg-slate-green/90 active:opacity-80 shadow-black/40 hover:shadow-md
                        justify-center" 
                        onClick={undefined}>
                        Sign Up
                    </Button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}