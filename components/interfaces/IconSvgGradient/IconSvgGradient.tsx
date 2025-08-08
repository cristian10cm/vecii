const IconSvgGradient =({urlImage,widthImg}:{urlImage:string,widthImg:string})=>{
    return(
    <div
        style={{
        width: widthImg,
        height:widthImg,
        background: 'linear-gradient( 90deg, #a141e0ff, #49ebd5ff)',
        WebkitMaskImage:  `url("${urlImage}")`,
        maskImage: `url("${urlImage}")`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: 'cover',
        maskSize: 'cover',
        }}
    ></div>
    )
}
export default IconSvgGradient