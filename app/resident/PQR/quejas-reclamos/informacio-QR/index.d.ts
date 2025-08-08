import { prototype } from "events"

export type dataPQR = {
author:{ 
    cellPhoneNumber: string
    createdAt: string
    email: string
    firstName: string
    id: string
    identificationNumber: string
    isActive: boolean
    lastName: string
    phoneNumber: string
    }
[[prototype]]:object,
caseNumber: string
createdAt: string
description : string
id: string
subject: string
}
export type logs = {
    createdAt: string,
    id: string,
    comments: string,
    updatedBy: {
                id: string,
                firstName: string,
                lastName: string
            }
}