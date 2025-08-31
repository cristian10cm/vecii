import { useEffect } from 'react';
import './index.css'
import { useFilterDate } from '@/components/stores/storeFilterDate';
const FilterDate =({onChangeOption,positionLeft}:{onChangeOption:(dato:boolean)=>void,positionLeft?:Boolean})=>{
    const {setMonth} = useFilterDate()
    const changeMonth =(e:number)=>{
        setMonth({
            numberMont:e
        })
        onChangeOption(false)
        console.log(e)
    }
    
    useEffect(()=>{
        setMonth({
            numberMont:13
        })

    },[])
const styleContainer = positionLeft ? `container_grid_filterDate left_date` :'container_grid_filterDate'
const meses = [
    { mes: 'Enero', value: 1},
    { mes: 'Febrero', value: 2 },
    { mes: 'Marzo', value: 3 },
    { mes: 'Abril', value: 4 },
    { mes: 'Mayo', value: 5 },
    { mes: 'Junio', value: 6 },
    { mes: 'Julio', value: 7 },
    { mes: 'Agosto', value: 8 },
    { mes: 'Septiembre', value: 9 },
    { mes: 'Octubre', value: 10 },
    { mes: 'Noviembre', value: 11 },
    { mes: 'Diciembre', value: 12 }
];


    return(
        <div className={styleContainer}>
            <p className='container_grid_filterDate_paragraphe'>Ordenar </p>
            <select  className='container_grid_filterDate_option' name="" id="" onChange={(e)=>changeMonth(Number(e.target.value))}>
                <option  value={13}>Sin seleccionar</option>
                {
                    meses.map((x,k)=>(
                        <option value={x.value} key={k}>{x.mes}</option>
                ))}
            </select>
        </div>    
    )
}
export default FilterDate