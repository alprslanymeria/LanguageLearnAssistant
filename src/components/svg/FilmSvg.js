"use client"

const FilmSvg = ({imagePath, index}) => {

    const uniquePatternId = `imgPattern_${index}`;

    return (

        <svg className="w-[200px] sm:w-[300px] md:w-[400px]" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M300 150C300 232.843 232.843 300 150 300C67.1573 300 0 232.843 0 150C0 67.1573 67.1573 0 150 0C232.843 0 300 67.1573 300 150ZM126.583 150C126.583 162.933 137.067 173.417 150 173.417C162.933 173.417 173.417 162.933 173.417 150C173.417 137.067 162.933 126.583 150 126.583C137.067 126.583 126.583 137.067 126.583 150Z" fill={`url(#${uniquePatternId})`}/>
        <defs>
            <pattern id={uniquePatternId} patternUnits="userSpaceOnUse" width="300" height="300">
                <image href={imagePath} x="0" y="0" width="300" height="300" preserveAspectRatio="none"/>
            </pattern>
        </defs>

        </svg>
    );
}

export default FilmSvg;