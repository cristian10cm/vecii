'use client'
import BackArrow from '../VeciiHeader/subComponents/BackArrow/BackArrow';
import './index.css';

const VeciiHeaderImg = ({srcImg, name, detail}:{srcImg:string, name:string, detail:String}) =>{

    return(
        <div className="veciiHeaderImg_container">
            <img src={srcImg} className="veciiHeaderImg_container_background"></img>
            <div className="veciiHeaderImg_container_info">
                <div className="veciiHeaderImg_container_backArrow">
                    <BackArrow></BackArrow>
                </div>
                <div className="veciiHeaderImg_container_names">
                    <p className="veciiHeaderImg_container_nameComponet">{name}</p>
                    <p className="veciiHeaderImg_container_detailComponent">{detail}</p>
                </div>
            </div>
        </div>
    );

};

export default VeciiHeaderImg;