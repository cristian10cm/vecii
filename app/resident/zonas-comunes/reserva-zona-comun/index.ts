
const startDate:Date = new Date();
const endDate:Date = new Date();
const numberRegex:RegExp = /^[\d]+$/;
const regexFecha:RegExp = /^\d{4}-\d{2}-\d{2}$/;
const today:string = new Date().toLocaleDateString('sv-SE');
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


import { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosHeaders } from 'axios';

export type AxiosBadRequestError = AxiosError<{
  message: string;
  error: string;
  statusCode: number;
}> & {
  config: AxiosRequestConfig;
  code: string;
  message: string;
  name: string;
  request: XMLHttpRequest & {
    onabort: (() => void) | null;
    onerror: (() => void) | null;
    onload: (() => void) | null;
    onloadend: (() => void) | null;
    onloadstart: (() => void) | null;
    onprogress: (() => void) | null;
    onreadystatechange: (() => void) | null;
    ontimeout: (() => void) | null;
    readyState: number;
    response: string;
    responseText: string;
    responseType: string;
    responseURL: string;
    responseXML: Document | null;
    status: number;
    statusText: string;
    timeout: number;
    upload: XMLHttpRequestUpload;
    withCredentials: boolean;
  };
  response: AxiosResponse<{
    message: string;
    error: string;
    statusCode: number;
  }> & {
    headers: AxiosHeaders;
    status: 400;
    statusText: 'Bad Request';
  };
  stack: string;
};
export {startDate,endDate,numberRegex,regexFecha,today,stringRegex}