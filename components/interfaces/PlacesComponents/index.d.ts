 export type dias = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export interface TimeRange {
  start?: string;
  end?: string;
}

// export const diasTraducidos: Partial<Record<string,string>>={
//     monday: 'Lunes',
//   tuesday: 'Martes',
//   wednesday: 'Miércoles',
//   thursday: 'Jueves',
// friday: 'Viernes',
//   saturday: 'Sábado',
//   sunday: 'Domingo',
// }  
 export interface placeInterface {
  createdAt: string,
  id: string,
  name: string,
  description: string,
  requiresPayment: boolean,
  hourlyRate:  string,
  capacity: number,
  availability: Partial<Record<dias, TimeRange>>
  reservationType: string,
  maxConcurrentReservations: number,
  maxReservationDuration: number,
  depositValue: string,
}
