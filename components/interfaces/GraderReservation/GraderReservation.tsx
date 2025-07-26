import './index.css';
const GraderReservation = ({nameReservation,grader}:{nameReservation:string,grader:string})=>{
    return (
        <div className='containerGraderResevation'>
            <p className='containerGraderResevation_name' >{nameReservation} </p>
            <p className='containerGraderResevation_grader' > <span className='containerGraderResevation_name-span'>⭐</span> {grader}, comunidad.</p>
        </div>
    )
}
export default GraderReservation