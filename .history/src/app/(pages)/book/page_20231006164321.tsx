"use client"
import Button from '../../components/generic/button'
import FormInput from '@/app/components/generic/formInput'
import SearchBarDynamic from '@/app/components/generic/searchBarDynamic'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import SearchBarResults from '@/app/components/generic/searchBarResults'
import { Booking, DropdownModel, Vehicle } from '@/app/types'
import { GetDate } from '@/app/integration/globalMethods'
import GetVehicles from '@/app/integration/rentalApi/getVehicles'

import PostCheckAvailabilityById from '@/app/integration/rentalApi/postCheckAvailabilityById'
import GetLocations from '@/app/integration/rentalApi/getLocations'
import { Location } from '@/app/types'
import VehicleItem from './vehicleItem'

export default function BookingPage(){
    const [modelsPopupOpen, setModelsPopupOpen] = useState(false)
    const [locationsPopupOpen, setLocationsPopupOpen] = useState(false)
    const [searchVehicleValue, setSearchVehicleValue] = useState("")
    const [searchLocationValue, setSearchLocationValue] = useState("")
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const [locations, setLocations] = useState<DropdownModel[]>([])
    const [confirmedEmail, setConfirmedEmail] = useState("")

    const [validation, setValidation] = useState({
        location: true,
        startDate: true,
        endDate: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        confirmedEmail: true,
        vehicleId: true
    })

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
            .then(x => x.data.map((a: Location) => obj.push({text: a.name, value: a.id})))
            .then(() => setLocations([...obj]))
    }, [])

    function UpdateStart(date: string){
        setBooking({...booking, startDate: GetDate(date)})
    }

    function UpdateEnd(date: string){
        setBooking({...booking, endDate: GetDate(date)})
    }

    function UpdateEmail(value: string){
        setBooking({...booking, email: value})
    }
    
    function UpdatePhone(value: string){
        setBooking({...booking, phone: value})
    }

    function ValidateReservationDetails(){
        setValidation({...validation, location: booking.locationId > 0, startDate: booking.startDate != "", endDate: booking.endDate != ""})
    }

    function ValidateUserDetails(){
        setValidation({
            ...validation, 
            email: booking.email != "", 
            confirmedEmail: booking.email == confirmedEmail, 
            phone: booking.phone != "", 
            vehicleId: booking.vehicleId > 0
        })
    }

    function UpdateVehicles(){
        ValidateReservationDetails()
        
        if(booking.locationId > 0 && booking.startDate != "" && booking.endDate != ""){
            GetVehicles(searchVehicleValue).then(x => {setVehicles([...x.data])})
            setBooking({...booking, vehicleId: 0})
        }
    }

    function UpdateLocation(text: string, location?: any){
        setSearchLocationValue(text)
        setBooking({...booking, locationId: location ?? 0})
    }

    function Submit(){
        //ValidateReservationDetails()
        ValidateUserDetails()
    }

    return(
        <main className="flex flex-col gap-4">
        <section id="header-section" className='max-w-7xl bg-black/90 mx-auto w-full p-6 lg:p-14 rounded-xl mt-4 shadow-md shadow-black/40'>
            <div className='w-full flex flex-col-reverse md:flex-row justify-between md:gap-20'>
            
            <div className="flex flex-col gap-10 w-full justify-between md:pb-10 text-white">
                <h1 className="hidden md:block text-3xl sm:text-5xl md:text-6xl"> Book your <span className="text-vermilion-400">Tesla</span> now. </h1>
                <Button className="w-full md:w-fit py-4 rounded-lg shadow-md shadow-black hover:bg-vermilion-500 bg-transparent capitalize md:border-white/50 border-vermilion-500/80
                    hover:border-vermilion-500 border-2 text-xl md:text-2xl justify-center max-md:mt-5 max-md:bg-vermilion-500/80"
                    onClick={() => UpdateVehicles()}> 
                Search
                </Button>
            </div>
            <div className="relative bottom-0 w-full h-fit max-md:pb-10 left-0 flex flex-col gap-2 pt-3 overflow-x-auto m-auto justify-around select-none md:pb-10 text-white">
                <div className="relative">
                <SearchBarDynamic searchString={searchVehicleValue} onChange={setSearchVehicleValue} placeholder="Search for models" 
                    onFocus={() => setModelsPopupOpen(true)} onBlur={() => HandleModelsBlur()} label="Model" className="w-full"
                    validationResult={booking.locationId > 0}/>
                <SearchBarResults results={models} onClick={setSearchVehicleValue} display={modelsPopupOpen}/>
                </div>
                <div className="relative">
                <SearchBarDynamic searchString={searchLocationValue} onChange={setSearchLocationValue} placeholder="Select pick-up location" 
                    onFocus={() => setLocationsPopupOpen(true)} onBlur={() => HandleLocationsBlur()} label="Pick-up Location" className="w-full"
                    validationResult={validation.location} validationMessage="This field is required."/>
                <SearchBarResults results={locations} onClick={UpdateLocation} display={locationsPopupOpen}/>
                </div>
                <FormInput minValue={GetDate()} onChange={UpdateStart} 
                    validationResult={validation.startDate}
                    validationMessage="This field is required." 
                    onBlur={() => setValidation({...validation, startDate: booking.endDate != ""})} 
                    className="w-full" type="date" label="Start Date"/>
                <FormInput onChange={UpdateEnd} 
                    minValue={booking.startDate ?? GetDate()} 
                    validationResult={validation.endDate}
                    validationMessage="This field is required."
                    onBlur={() => setValidation({...validation, endDate: booking.startDate != ""})} 
                    className="w-full" type="date" label="End Date"/>
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
                <FormInput className="w-full" label="Email" onChange={UpdateEmail} validationResult={validation.email} validationMessage="This field is required." onBlur={ValidateUserDetails}/>
                <FormInput className="w-full" label="Confirm Email" onChange={setConfirmedEmail} validationResult={validation.confirmedEmail} validationMessage="Emails are not matching."  onBlur={ValidateUserDetails}/>
                <FormInput className="w-full" label="Phone Number" onChange={UpdatePhone} validationResult={validation.phone} validationMessage="This field is required."  onBlur={ValidateUserDetails}/>
                <Button className="text-white w-full md:w-fit mt-8 mr-0 ml-auto text-lg bg-green-500/80 hover:bg-green-500/90 active:opacity-80 shadow-black/40 hover:shadow-md
                    justify-center" 
                    onClick={() => Submit()}>
                    Confirm
                </Button>
                {validation.vehicleId ? <></> : <h3 className="text-vermilion-400 text-base flex flex-row-reverse">No vehicle selected.</h3>}
            </div>
        </section>
        </main>
    )
}

