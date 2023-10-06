"use client"
import Button from '../../components/generic/button'
import FormInput from '@/app/components/generic/formInput'
import SearchBarDynamic from '@/app/components/generic/searchBarDynamic'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import SearchBarResults from '@/app/components/generic/searchBarResults'
import { Booking, DropdownModel, Vehicle } from '@/app/types'
import { GetDate } from '@/app/integration/globalMethods'
import GetVehicles from '@/app/integration/rentalApi/getVehicles'
import Image from 'next/image'
import tesla from "../../../../public/media/tesla-mirrored.png"
import PostCheckAvailabilityById from '@/app/integration/rentalApi/postCheckAvailabilityById'
import GetLocations from '@/app/integration/rentalApi/getLocations'
export default function BookingPage(){
    const [modelsPopupOpen, setModelsPopupOpen] = useState(false)
    const [locationsPopupOpen, setLocationsPopupOpen] = useState(false)
    const [searchVehicleValue, setSearchVehicleValue] = useState("")
    const [searchLocationValue, setSearchLocationValue] = useState("")
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const [locations, setLocations] = useState<DropdownModel[]>([])

    function HandleModelsBlur(){
        setTimeout(() => setModelsPopupOpen(false), 100)
    }

    function HandleLocationsBlur(){
        setTimeout(() => setLocationsPopupOpen(false), 100)
    }



    const models = [{text: "Model Y"}, {text: "Model X"}, {text: "Model S"}, {text: "Roadster"}]
    
    const [booking, setBooking] = useState<Booking>({
        vehicleId: 0,
        phone: "",
        email: "",
        startDate: "",
        endDate: "",
        locationId: 0
    })



    useEffect(() => {
      // Check validation
    }, [booking])

    useEffect(() => {
        const obj: DropdownModel[] = []

        GetLocations()
            .then(x => x.data.map(a => obj.push({text: a.Name, value: a.Id})))
            .then(() => setLocations([...obj]))
        // GetLocations().then(x => setLocations([...x.data]))
    }, [])

    function UpdateStart(date: string){
        setBooking({...booking, startDate: GetDate(date)})
    }

    function UpdateEnd(date: string){
        setBooking({...booking, endDate: GetDate(date)})
    }

    function UpdateVehicles(){
        GetVehicles(searchVehicleValue).then(x => {setVehicles([...x.data])})
        setBooking({...booking, vehicleId: 0})
    }

    return(
        <main className="flex flex-col gap-4">
        <section id="header-section" className='max-w-7xl bg-black/90 mx-auto w-full p-6 lg:p-14 rounded-xl mt-4 shadow-md shadow-black/40'>
            <div className='w-full flex flex-col-reverse md:flex-row justify-between md:gap-20'>
            
            <div className="flex flex-col  gap-10 w-full justify-between md:pb-10 text-white">
                <h1 className="hidden md:block text-3xl sm:text-5xl md:text-6xl"> Book your <span className="text-vermilion-400">Tesla</span> now. </h1>
                <Button className="w-full md:w-fit py-4 rounded-lg shadow-md shadow-black hover:bg-vermilion-500 bg-transparent capitalize md:border-white/50 border-vermilion-500/80
                    hover:border-vermilion-500 border-2 text-xl md:text-2xl justify-center max-md:mt-5 max-md:bg-vermilion-500/80"
                    onClick={() => UpdateVehicles()}> 
                Search
                </Button>
            </div>
            <div className="relative bottom-0 w-full h-fit left-0 flex flex-col gap-2 pt-3 overflow-x-auto m-auto justify-around select-none md:pb-10 text-white">
                <div className="relative">
                <SearchBarDynamic searchString={searchVehicleValue} onChange={setSearchVehicleValue} placeholder="Search for models" onFocus={() => setModelsPopupOpen(true)} onBlur={() => HandleModelsBlur()} label="Model" className="w-full"/>
                <SearchBarResults results={models} onClick={setSearchVehicleValue} display={modelsPopupOpen}/>
                </div>
                <div className="relative">
                <SearchBarDynamic searchString={searchLocationValue} onChange={setSearchLocationValue} placeholder="Select pick-up location" onFocus={() => setLocationsPopupOpen(true)} onBlur={() => HandleLocationsBlur()} label="Pick-up Location" className="w-full"/>
                <SearchBarResults results={locations} onClick={setSearchLocationValue} display={locationsPopupOpen}/>
                </div>
                <FormInput minValue={GetDate()} onChange={UpdateStart} className="w-full" type="date" label="Start Date"/>
                <FormInput minValue={booking.startDate ?? GetDate()} onChange={UpdateEnd} className="w-full" type="date" label="End Date"/>
            </div>
            <h1 className="md:hidden block text-3xl sm:text-5xl md:text-6xl text-white"> Book your <span className="text-vermilion-400">Tesla</span> now. </h1>
            </div>
        </section>

        <section id="header-section" className='max-w-7xl bg-black/90 mx-auto w-full p-6 lg:p-14 rounded-xl mt-4 shadow-md shadow-black/40'>
            <div className="flex flex-col gap-5 text-white">
                {vehicles.length > 0 && vehicles.map((x, key) => <VehicleItem booking={booking} setSelected={setBooking} vehicle={x} startDate={booking.startDate} endDate={booking.endDate} key={key}/>)}
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

function VehicleItem({vehicle, startDate, endDate, setSelected, booking}:{
    vehicle: Vehicle,
    startDate: string,
    endDate: string;
    setSelected: Dispatch<SetStateAction<Booking>>;
    booking: Booking;
}){
    const [available, setAvailable] = useState(false)
    
    useEffect(() => {
        PostCheckAvailabilityById(vehicle.id ?? 0, startDate, endDate)
            .then(x => setAvailable(x.data))
    }, [vehicle])
    

    return(
        <div className="w-full p-4 rounded-md bg-slate-500/40 flex gap-5">
            <div className="h-32 aspect-square bg-white rounded-md relative flex shrink-0">
                <Image src={tesla} layout="fill" objectFit="contain" alt="Tesla Photo" className="h-full shadow-sm shadow-black/40 z-20 group-hover:opacity-50"/>
            </div>
            <div className="text-white w-full flex flex-col justify-between gap-1">
                <h1 className="text-3xl font-semibold">{vehicle.make + " " + vehicle.model}</h1>
                <h2 className="text-xl"> Available at ${vehicle.rate}/day.</h2>
                <div className="flex justify-between place-items-center">
                    <h3 className="text-xl">{available ? 
                    <span className="text-green-400">Available</span> : 
                    <span className="text-vermilion-400">Unavailable at that time</span>
                    }
                    </h3>
                    <Button disabled={!available} onClick={() => setSelected({...booking, vehicleId: vehicle.id ?? 0})} 
                    className={`${booking.vehicleId == vehicle.id && available ? "bg-green-500/80 hover:bg-green-500/90" : ""} text-white w-full md:w-fit mr-0 ml-auto text-xl  active:opacity-80 shadow-black/40 hover:shadow-md
                    justify-center`}>
                    {booking.vehicleId == vehicle.id && available ? "Selected" : "Select"}
                    </Button>
                </div>
            </div>
        </div>
    )
}