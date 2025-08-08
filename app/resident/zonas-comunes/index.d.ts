export type reservedAreas = {
    id: string,
    startTime: Date | string,
    endTime: Date | string,
    status: "pending",
    totalCost: string,
    commonArea: {
        name: string
    }
}
export type places =  {
    id:string,
    name:string,
    requiresPayment:boolean,
    hourlyRate:string,
    capacity:string,
}