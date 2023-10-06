import endpoints from "@/app/endpoints.json"

export default async function PostCheckAvailabilityByModel(model: string, startDate: string, endDate: string){
    //const apiEndpoint = GetApiEndpoint()
    console.log("inside function")
    
    const data = {
        Model: model,
        startDate: startDate,
        endDate: endDate
    }

    let response = await fetch(endpoints.rentalApiEndpoint + "CheckAvailability",
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