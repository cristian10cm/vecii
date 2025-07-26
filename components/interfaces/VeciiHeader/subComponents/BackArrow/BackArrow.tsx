"use client";
import './index.css';

const BackArrow = () =>{

    const verifyHistory = () => history.back()

    return(

        <div className="backArrow_history">
            <img 
                onClick={verifyHistory}
                className="backArrow_history_icon"
                src={'/assets/png/arrowBack.png'} 
            />
        </div>
        
    );

};

export default BackArrow;