"use client"

const BookSvg = ({imagePath, color}) => {

    return (

        <svg className='w-[200px] h-[324px] sm:w-[250px] sm:h-[406px] md:w-[300px] md:h-[487px]' width="295" height="500" viewBox="0 0 295 550" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M34.6112 94.4469V538.211L293.856 480.601V36.8369L34.6112 94.4469Z" fill="url(#pattern0_2124_43)"/>
        <path d="M34.6112 538.211V94.4469L1 58.0791V498.134L34.6112 538.211Z" fill={color}/>
        <path d="M34.6112 94.4469L293.856 36.8369L258.784 0.793906L1 58.0791L34.6112 94.4469Z" fill="white"/>
        <path d="M34.6112 94.4469V538.211M34.6112 94.4469L293.856 36.8369M34.6112 94.4469L1 58.0791M34.6112 538.211L293.856 480.601V36.8369M34.6112 538.211L1 498.134V58.0791M293.856 36.8369L258.784 0.793904L1 58.0791" stroke="black"/>

        <g transform="skewY(-12.5)">
            <image 
            x="35" 
            y="103" 
            width="258"
            height="442"
            preserveAspectRatio="none"
            href={imagePath}
            />
        </g>

        </svg>
    );
}

export default BookSvg;