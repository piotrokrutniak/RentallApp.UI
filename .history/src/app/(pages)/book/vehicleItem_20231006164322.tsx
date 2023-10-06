import { Booking, Vehicle } from "@/app/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from 'next/image'
import tesla from "../../../../public/media/tesla-mirrored.png"
import Button from "@/app/components/generic/button";
import PostCheckAvailabilityById from "@/app/integration/rentalApi/postCheckAvailabilityById";

export default function VehicleItem({vehicle, startDate, endDate, setSelected, booking}:{
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
                <h1 className="text-xl sm:text-3xl font-semibold">{vehicle.make + " " + vehicle.model}</h1>
                <h2 className="text-base sm:text-xl"> Available at ${vehicle.rate}/day.</h2>
                <div className="flex justify-between place-items-center">
                    <h3 className="text-base sm:text-xl">{available ? 
                    <span className="text-green-400">Available</span> : 
                    <span className="text-vermilion-400">Unavailable at that time</span>
                    }
                    </h3>
                    <Button disabled={!available} onClick={() => setSelected({...booking, vehicleId: vehicle.id ?? 0})} 
                    className={`${booking.vehicleId == vehicle.id && available ? "bg-green-500/80 hover:bg-green-500/90" : ""} 
                        text-white w-fit mr-0 ml-auto text-sm md:text-base active:opacity-80 shadow-black/40 hover:shadow-md justify-center`}>
                    {booking.vehicleId == vehicle.id && available ? "Selected" : "Select"}
                    </Button>
                </div>
            </div>
        </div>
    )
}