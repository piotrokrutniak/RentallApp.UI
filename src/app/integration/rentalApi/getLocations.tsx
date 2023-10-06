import endpoints from "@/app/endpoints.json"

export default async function GetLocations(){
    let response = await fetch(endpoints.rentalApiEndpoint + "api/v1/Location",
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