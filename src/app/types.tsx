export type FileOrUndefined = File | undefined;

// DTOs

export type Recipe = {
    _id?: String,
    title: String,
    summary: string,
    preparationTime: number,
    rating: Number,
    coverImage?: String,
    active: boolean,
    publishedDate: string
}

export type Ingredient = {
    _id?: String,
    name: String,
    vegan: Boolean,
    vegetarian: Boolean
}

export type RecipeIngredient = {
    _id?: String,
    recipeId: String,
    ingredientId: String,
    desc: String
}

export type RecipeSection = {
    _id?: string,
    recipeId: string,
    title: string,
    richText: string,
    order: number
}

export type Booking = {
    id?: number,
    vehicleId: number,
    locationId: number,
    phone: string,
    email: string,
    fee?: number,
    startDate: string,
    endDate: string,
    created?: Date,
    lastModified?: Date
}

export type Vehicle = {
    id?: number,
    vin: string,
    make: string,
    model: string,
    rate: number,
    locationId: number,
}

export type DropdownModel = {
    text: string,
    value: any
}

export type Location = {
    id?: number,
    name: string,
    street: string,
    building: number,
    city: string,
    postalCode: string,
    email: string,
    phone: string,
    active: boolean
}

export type BookingValidation = {
    location: boolean,
    startDate: boolean,
    endDate: boolean,
    firstName: boolean,
    lastName: boolean,
    email: boolean,
    phone: boolean,
    confirmedEmail: boolean,
    vehicleId: boolean,
    apiErrors: string[]
}

    //    [Id]
    //   ,[Name]
    //   ,[Street]
    //   ,[Building]
    //   ,[City]
    //   ,[PostalCode]
    //   ,[Email]
    //   ,[Phone]
    //   ,[Active]


//  [Id]
// ,[Vin]
// ,[Make]
// ,[Model]
// ,[Rate]
// ,[LocationId]
// ,[CreatedBy]
// ,[Created]
// ,[LastModifiedBy]
// ,[LastModified]

//        [VehicleId]
//       ,[Email]
//       ,[Phone]
//       ,[Fee]
//       ,[StartDate]
//       ,[EndDate]
//       ,[CreatedBy]
//       ,[Created]
//       ,[LastModifiedBy]
//       ,[LastModified]
