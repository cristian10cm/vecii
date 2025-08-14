
   export function apiDataFilter<T>(data:T[],key:keyof T,state:boolean, SearchBar:string){
  
  const filtered = data.filter((x) =>String(x[key]).toLowerCase().trim().includes(SearchBar.toLowerCase().trim()) 


);
  const filterData = !state && filtered.length > 10? filtered.slice(0, 10): filtered;
  const stateSeeMore = !state && filtered.length > 10;

  return { filterData, stateSeeMore };

   }

export function apiDataFilterKeyChild<T,k extends keyof T,kc extends keyof T[k]>(data:T[],key:k,keyChild: kc,state:boolean, SearchBar:string){
  
  const filtered = data.filter((x) =>String((x[key] as any)?.[keyChild ]).toLowerCase().trim().includes(SearchBar.toLowerCase().trim()))

  const filterData = !state && filtered.length > 10? filtered.slice(0, 10): filtered;
  const stateSeeMore = !state && filtered.length > 10;

  return { filterData, stateSeeMore };

}

export function apiDataFilterDate<T>(
  data: T[],
  date: keyof T,      
  month?: number,      
  state?: boolean,
) {
  const filtered =  data
    .filter((x) => {
      const dateS = (String(x[date]));
      const dFilter = parseInt(dateS.split('-')[1]);
      return month !== 13 ? dFilter === month:dateS
    })
    .sort((a, b) => {
      const dateA = new Date(String(a[date])).getTime();
      const dateB = new Date(String(b[date])).getTime();
      return dateB - dateA;     });

  const filterData = !state && filtered.length > 10 ? filtered.slice(0, 10) : filtered;
  const stateSeeMore = !state && filtered.length > 10;

  return { filterData, stateSeeMore };
}

