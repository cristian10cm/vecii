import GoTo from '@/components/logics/GoTo';
import './index.css';

const VisitorComeIn = ({srcImg , name, pathUrl}:{srcImg:string , name:string, pathUrl:string}) => {

    const goToPath = GoTo();

    return(
        <div className='component_comeIn_comeOut' onClick={()=>goToPath({path:pathUrl})}>
            <img className='component_comeIn_comeOut_icon'src={srcImg}></img>
            <p className='component_comeIn_comeOut_name'>{name}</p>
        </div>
    );

};

export default VisitorComeIn;