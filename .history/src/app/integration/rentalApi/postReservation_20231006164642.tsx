import endpoints from "@/app/endpoints.json"
import { Booking } from "@/app/types"

export default async function PostReservation(booking: Booking){

    let response = await fetch(endpoints.rentalApiEndpoint + "CheckAvailabilityById",
                        {
                            method: 'POST',
                            mode: 'cors',
                            headers:{
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(booking)
                        }
    )

    let body = await response.json()          
    return await body
}