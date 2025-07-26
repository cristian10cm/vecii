
import './index.css';
import StateComponent from '../StateComponent/StateComponent';
type VisitorRegistriesPorps = {
    srcImg: string,
    name: string,
    complexDetails: string,
    status: boolean,
    date: string
};

const VisitorRegistries = ({ srcImg, name, complexDetails, status, date }: VisitorRegistriesPorps) => {

    return (
        <div className='container_visitorRegistry'>
            <div className='container_visitorRegistry_avatarContainer'>
                <img src={srcImg} className='container_visitorRegistry_avatarImg'></img>
            </div>
            <div className='container_visitorRegistry_infoVisitor'>
                <p className='container_visitorRegistry_visitorName'>{name}</p>
                <p className='container_visitorRegistry_complexDetails'>{complexDetails}</p>
            </div>
            <div className='container_visitorRegistry_statusAndDate'>
                <StateComponent
                    statusComp = {status}
                    dataFalse='No ingreso'
                    dataTrue='Ingreso'
                />
                <p className='container_visitorRegistry_date'>{date}</p>
            </div>
        </div>
    );

};

export default VisitorRegistries;