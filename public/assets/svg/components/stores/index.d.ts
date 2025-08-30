 interface PayInvoice{
    status: boolean,
    monthService:string,
    precieService: string,
    dateService: string
}
 type AuthPayInvoice = {
    invoice : PayInvoice| null,
    setInvoice : (newInvoice:PayInvoice) =>void
}

export { AuthPayInvoice, PayInvoice}