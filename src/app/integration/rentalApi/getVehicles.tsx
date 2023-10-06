// 
import endpoints from "@/app/endpoints.json"

export default async function GetVehicles(model: string){
    let response = await fetch(endpoints.rentalApiEndpoint + "api/v1/Vehicle?Model=" + model,
                        {
                            method: 'GET',
                            mode: 'cors',
                            headers:{
                                'Content-Type': 'application/json'
                            },
                        }
    )

    let body = await response.json()          

    return await body
}