import endpoints from "@/app/endpoints.json"

export default async function PostCheckAvailabilityByModel(vehicleId: number, startDate: string, endDate: string){
    const data = {
        "vehicleId": vehicleId,
        "startDate": startDate,
        "endDate": endDate
    }

    let response = await fetch(endpoints.rentalApiEndpoint + "CheckAvailabilityById",
                        {
                            method: 'POST',
                            mode: 'cors',
                            headers:{
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        }
    )

    let body = await response.json()          
    return await response
}