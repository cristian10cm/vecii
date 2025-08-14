import './index.css'
const NoApiData = ({message}:{message:string})=>{
    return (
        <div className='containerGrid_message_noData'>
            <p>{message}</p>
        </div>
    )
}
export default NoApiData