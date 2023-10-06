"use client"
import Image from 'next/image'
import Button from '../../components/generic/button'

import Link from 'next/link'
import FormInput from '@/app/components/generic/formInput'
import SearchBar from '@/app/components/generic/searchBar'

export default function BookingPage(){
    return(
        <main className="flex flex-col gap-4">
        <section id="header-section" className='max-w-7xl bg-black/90 mx-auto w-full p-14 rounded-xl mt-4 shadow-md shadow-black/40'>
            <div className='w-full flex flex-col md:flex-row justify-between gap-20'>
            <div className="flex flex-col gap-10 w-full justify-between md:pb-10 text-white">
            <h1 className="text-5xl md:text-6xl"> Rent a <span className="text-vermilion-400">Tesla</span> on Mallorca. </h1>
            <Link href="/book">
                <Button className="w-fit py-4 rounded-lg shadow-md shadow-black hover:bg-vermilion-500 bg-transparent capitalize border-white/50 hover:border-vermilion-500 border-2 text-2xl"> 
                Book Now 
                </Button>
            </Link>
            </div>
            <div className="relative w-full h-96 left-0 flex flex-col gap-5 pt-3 overflow-x-auto m-auto justify-around select-none md:pb-10 text-white">
                <SearchBarDynamic/>
                <FormInput className="w-full" label="Model"/>
                <FormInput className="w-full" type="date" label="Start Date"/>
                <FormInput className="w-full" type="date" label="End Date"/>
            </div>
            </div>
        </section>

        <section id="header-section" className='max-w-7xl bg-black/90 mx-auto w-full p-14 rounded-xl mt-4 shadow-md shadow-black/40'>
            <div className="relative w-1/2 left-0 flex flex-col gap-5 pt-3 overflow-x-auto m-auto justify-around select-none md:pb-10 text-white">
                <FormInput className="w-full" label="First Name"/>
                <FormInput className="w-full" label="Last Name"/>
                <FormInput className="w-full" label="Email"/>
                <FormInput className="w-full" label="Phone Number"/>
            </div>
        </section>

        
        </main>
    )
}