import './index.css'
import GoTo from '@/components/logics/GoTo'
const CatalogStore = ({nameCatalog,imgCatalog,idCatalogo}:{nameCatalog:string,imgCatalog:string,idCatalogo:string})=>{
    const goToPath = GoTo()
    const verProductos = ()=>{
        goToPath({path:'/resident/mi-hogar/mis-servicios/tienda/productos/'})
        localStorage.setItem('idCatalogo',idCatalogo)
    }
    return(
        <div className='container_catalogo' onClick={verProductos}>
                        <img className='container_catalogo_img' src= {imgCatalog} alt="Foto catalogo" />
                        <p className='container_catalogo_name'>⚡{nameCatalog }  </p>
        </div>
    )
}
export default CatalogStore