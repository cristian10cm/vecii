
const startDate:Date = new Date();
const endDate:Date = new Date();
const numberRegex:RegExp = /^[\d]+$/;
const regexFecha:RegExp = /^\d{4}-\d{2}-\d{2}$/;
const today:string = new Date().toISOString().split('T')[0];
const stringRegex:RegExp = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñÇçÀàÈèÌìÒòÙùÂâÊêÎîÔôÛûÄäËëÏïÖöÅåÆæØøß\s]+$/;
export type Reservation = {
  createdAt: string;
  id: string;
  commonArea: {
    createdAt: string;
    id: string;
    name: string;
    description: string;
    requiresPayment: boolean;
    hourlyRate: number;
    capacity: number;
    availability: {
      monday?: {
        start: string; 
        end: string; 
      };
      tuesday?: {
        start: string;
        end: string;
      };

    };
    reservationType: 'shared' | 'exclusive';
    maxConcurrentReservations: number;
    maxReservationDuration: number;
    depositValue: number;
    complex: {
      createdAt: string;
      id: string;
      name: string;
      address: string;
      contactNumber: string;
      contactEmail: string;
    };
  };
  housing: {
    createdAt: string;
    id: string;
    name: string;
    order: number;
    status: 'occupied' | 'available' | string;
  };
  reservedBy: {
    createdAt: string;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    identificationNumber: string;
    phoneNumber: string;
    cellPhoneNumber: string;
  };
  startTime: string; 
  endTime: string;
  status: 'approved' | 'pending' | 'cancelled' | string;
  totalCost: number;
  notes: string;
};
export {startDate,endDate,numberRegex,regexFecha,today,stringRegex}