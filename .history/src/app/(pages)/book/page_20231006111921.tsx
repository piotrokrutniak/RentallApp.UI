"use client"
import Image from 'next/image'
import Button from '../../components/generic/button'

import Link from 'next/link'
import FormInput from '@/app/components/generic/formInput'
import SearchBar from '@/app/components/generic/searchBar'
import SearchBarDynamic from '@/app/components/generic/searchBarDynamic'
import { useEffect, useState } from 'react'
import SearchBarResults from '@/app/components/generic/searchBarResults'
import { Booking } from '@/app/types'
import { GetDate } from '@/app/integration/globalMethods'
import PostCheckAvailabilityByModel from '@/app/integration/rentalApi/postCheckAvailabilityByModel'
import GetVehicles from '@/app/integration/rentalApi/getVehicles'

export default function BookingPage(){
    const [popupOpen, setPopupOpen] = useState(false)
    const [searchValue, setSearchValue] = useState("")

    function HandleBlur(){
        setTimeout(() => setPopupOpen(false), 100)
    }

    const models = ["Model Y", "Model X", "Model S", "Roadster"]
    
    const [booking, setBooking] = useState<Booking>({
        vehicleId: 0,
        phone: "",
        email: "",
        startDate: "",
        endDate: "",
    })

    useEffect(() => {
      // Check validation
    }, [booking])
    
    function UpdateStart(date: string){
        setBooking({...booking, startDate: GetDate(date)})
    }

    function UpdateEnd(date: string){
        setBooking({...booking, endDate: GetDate(date)})
    }

    return(
        <main className="flex flex-col gap-4">
        <section id="header-section" className='max-w-7xl bg-black/90 mx-auto w-full p-6 lg:p-14 rounded-xl mt-4 shadow-md shadow-black/40'>
            <div className='w-full flex flex-col-reverse md:flex-row justify-between md:gap-20'>
            
            <div className="flex flex-col  gap-10 w-full justify-between md:pb-10 text-white">
                <h1 className="hidden md:block text-3xl sm:text-5xl md:text-6xl"> Book your <span className="text-vermilion-400">Tesla</span> now. </h1>
                <Button className="w-full md:w-fit py-4 rounded-lg shadow-md shadow-black hover:bg-vermilion-500 bg-transparent capitalize md:border-white/50 border-vermilion-500/80
                    hover:border-vermilion-500 border-2 text-xl md:text-2xl justify-center max-md:mt-5 max-md:bg-vermilion-500/80"
                    onClick={() => GetVehicles(searchValue)}> 
                Search
                </Button>
            </div>
            <div className="relative bottom-0 w-full h-96 left-0 flex flex-col gap-2 pt-3 overflow-x-auto m-auto justify-around select-none md:pb-10 text-white">
                <div className="relative">
                <SearchBarDynamic searchString={searchValue} onChange={setSearchValue} placeholder="Search for models" onFocus={() => setPopupOpen(true)} onBlur={() => HandleBlur()} label="Model" className="w-full"/>
                <SearchBarResults results={models} onClick={setSearchValue} display={popupOpen}/>
                </div>
                <FormInput minValue={GetDate()} onChange={UpdateStart} className="w-full" type="date" label="Start Date"/>
                <FormInput minValue={booking.startDate ?? GetDate()} onChange={UpdateEnd} className="w-full" type="date" label="End Date"/>
            </div>
            <h1 className="md:hidden block text-3xl sm:text-5xl md:text-6xl text-white"> Book your <span className="text-vermilion-400">Tesla</span> now. </h1>
            </div>
        </section>

        <section id="header-section" className='max-w-7xl bg-black/90 mx-auto w-full p-6 lg:p-14 rounded-xl mt-4 shadow-md shadow-black/40'>
            <div className="flex flex-col gap-5">
                <div className="w-full h-44 rounded-md bg-slate-400/40"></div>
            </div>
        </section>

        <section id="header-section" className='max-w-7xl bg-black/90 mx-auto w-full p-6 lg:p-14 rounded-xl mt-4 shadow-md shadow-black/40'>
            <div className="relative lg:w-1/2 left-0 flex flex-col gap-5 pt-3 overflow-x-auto m-auto justify-around select-none md:pb-10 text-white">
                <FormInput className="w-full" label="First Name"/>
                <FormInput className="w-full" label="Last Name"/>
                <FormInput className="w-full" label="Email"/>
                <FormInput className="w-full" label="Phone Number"/>
                <Button className="text-white w-full md:w-fit mt-5 mr-0 ml-auto text-xl bg-green-500/80 hover:bg-green-500/90 active:opacity-80 shadow-black/40 hover:shadow-md
                    justify-center" 
                    onClick={undefined}>
                    Confirm
                </Button>
            </div>
        </section>
        </main>
    )
}