export type adminType = {
            createdAt: string,
            id: string,
            invoiceNumber: null | string,
            totalAmount: string,
            status: string,
            dueDate: string,
            description: string,
            relatedEntityName: null | string,
            relatedEntityId: null | string
        
}

export const getMonthName = (isoDate: string): string => {
  const date = new Date(isoDate)
  return date.toLocaleString('es-ES', { month: 'long' })
}

export function apiDataFilter<T>(data:T[],key:keyof T,state:boolean, SearchBar:string){
  
  const filtered = data.filter((x) =>getMonthName(String(x[key]).toLowerCase().trim()).includes(SearchBar.toLowerCase().trim()) 


);
  const filterData = !state && filtered.length > 10? filtered.slice(0, 10): filtered;
  const stateSeeMore = !state && filtered.length > 10;

  return { filterData, stateSeeMore };

   }
