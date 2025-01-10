import { useState, useRef, useEffect } from 'react'
import './App.css'
import { LuTimer } from "react-icons/lu";
import { RiAwardLine } from "react-icons/ri";
import { GoGraph } from "react-icons/go";

const extractPrimaryColor = (imageUrl, callback, colorRank = 0, colorGranularity = 20) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Handle cross-origin images
    img.src = imageUrl;

    img.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);

        const imageData = context.getImageData(0, 0, img.width, img.height);
        const pixels = imageData.data;

        const colorCount = {};
        const colors = [];

        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const a = pixels[i + 3]; // Alpha channel

            // Skip fully transparent pixels
            if (a === 0) continue;

            // Group colors by rounding to the nearest granularity value
            const roundedR = Math.round(r / colorGranularity) * colorGranularity;
            const roundedG = Math.round(g / colorGranularity) * colorGranularity;
            const roundedB = Math.round(b / colorGranularity) * colorGranularity;

            const luminocity = (r + g + b) / 3;
            const key = `${roundedR},${roundedG},${roundedB}`;

            colorCount[key] = (colorCount[key] || 0) + 1;

            if (luminocity < 220 && luminocity > 30) {
                colors.push({ key, count: colorCount[key], color: [roundedR, roundedG, roundedB] });
            }
        }

        // Sort colors by their count, descending
        colors.sort((a, b) => b.count - a.count);

        // Select the color based on the rank (0 for the most dominant, 1 for the second most, etc.)
        const selectedColor = colors[colorRank] ? colors[colorRank].color : colors[colors.length-1].color;

        // Return the color as RGB string
        callback(`rgb(${selectedColor.join(",")})`);
    };
};


function Stat({ stat, sort,view,setCurrentHovered }) {
    const [primaryColor, setPrimaryColor] = useState(null);
    const [secondaryColor, setSecondaryColor] = useState(null);
    const [height, setHeight] = useState(200);
    const imgRef = useRef(null);
    useEffect(() => {
        extractPrimaryColor(stat.icon, setPrimaryColor,0,50);
        extractPrimaryColor(stat.icon, setSecondaryColor, 1, 10);
    }, [stat.icon]);
    useEffect(() => {
        if (sort === "time") {
            setHeight(stat.time);
        }
        else if (sort === "achivements") {
            setHeight(stat.achivements*2);
        }
        else {
            setHeight(view === "grid" ? 100 : 200);
        }
    }, [sort,view]);

    const SetHovered = (hovered) =>{
        if(hovered){
            setCurrentHovered({colors: [secondaryColor,primaryColor]})
        }
        else{
            setCurrentHovered({colors: ["rgba(47,47,47,1)","rgba(61,61,61,1)"]})
        }
    }
    const dinamycStyle = { background: primaryColor, width: height };
    return (
        <>
            <div className={`stat ${sort !== "" ? 'sorted':''} ${view}`} onPointerEnter={()=>SetHovered(true)} onPointerLeave={()=>SetHovered(false)}>
                <div className='cube'> 
                    <div className='face front' style={dinamycStyle}>
                        {sort == "" && <img src={stat.icon} className='game-icon' ref={imgRef} />}
                    </div>
                    <div className='face right' style={dinamycStyle}>
                        {sort == "" && <LuTimer className='icon' />}
                    </div>
                    <div className='face back' style={dinamycStyle}>
                        {sort == "" && <RiAwardLine className='icon' />}
                    </div>
                    <div className='face left' style={dinamycStyle}>
                        {sort == "" && <GoGraph className='icon' />}
                    </div>
                    <div class="face top" style={dinamycStyle}></div>
                    <div class="face bottom" style={dinamycStyle}></div>
                </div>

                {view === "list" && <div className='content'>
                    <div>
                        <h1>{stat.game}</h1>
                    </div>
                    <div>
                        <h1>Time played</h1>
                        <h3>{stat.time} hours</h3>
                    </div>
                    <div>
                        <h1>Achivements</h1>
                        <h3>{stat.achivements} percent</h3>
                    </div>
                    <div>
                        <h1>Statistics</h1>
                    </div>
                </div>}
            </div>
        </>
    )
}

export default Stat