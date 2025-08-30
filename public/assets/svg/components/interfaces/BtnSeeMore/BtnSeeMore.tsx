import './index.css'
const BtnSeeMore =({enable}:{enable : ()=>void})=>{
        return(
            <div className='container_btnSeeMore'>
                <button className='container_btnSeeMore_btn' onClick={enable}>Ver mas</button>
            </div>
        )
}
export default BtnSeeMore