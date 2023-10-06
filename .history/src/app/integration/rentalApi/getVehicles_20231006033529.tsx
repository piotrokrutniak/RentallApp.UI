// 
import endpoints from "@/app/endpoints.json"

export default async function GetVehicles(model: string){
    let params = ""
    model ? params.concat("Model=" + model) : ""

    console.log(params)

    let response = await fetch(endpoints.rentalApiEndpoint + "api/v1/Vehicle?" + params,
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