import { useState,useRef, useEffect } from 'react'
import './App.css'
import Packery from 'packery';
import Stat from './Stat';

import { LuTimer } from "react-icons/lu";
import { RiAwardLine } from "react-icons/ri";
import { GoGraph } from "react-icons/go";
import { FaList } from "react-icons/fa";
import { BsGrid3X3GapFill } from "react-icons/bs";
import GradientBackground from './GradientBackground';

function App() {
  const packeryRef = useRef(null);
  const [currentHovered,setCurrentHovered] = useState({colors: ["rgba(47,47,47,1)","rgba(61,61,61,1)"]});
  const [statistics,setStatistics] = useState([
    {"game":"Terraria", "icon": "/proxy/icon_thumb/912b92ae7dbedd0344a6580a7b90efc6.png","time": 180,"achivements": 100},
    {"game":"Rocket League","icon": "https://img.icons8.com/fluent/512/rocket-league.png","time": 250,"achivements": 30},
    {"game":"Counter-Strike 2","icon":"/proxy/icon/e1bd06c3f8089e7552aa0552cb387c92/32/512x512.png","time": 70,"achivements": 40},
    {"game":"Minecraft","icon":"https://static.wikia.nocookie.net/logopedia/images/f/f9/Minecraft_Bedrock_icon.svg","time": 70,"achivements": 40},
    {"game":"Fortnite","icon":"https://static.wikia.nocookie.net/logopedia/images/d/db/Fortnite_S1.svg","time": 70,"achivements": 40},
    {"game":"Noita","icon":"/proxy/icon/27b587bbe83aecf9a98c8fe6ab48cacc.ico","time": 70,"achivements": 40}])
  
  const [sort,setSort] = useState("")
  const [view,setView] = useState("grid")

  useEffect(() => {
    const packery = new Packery(packeryRef.current, {
      itemSelector: '.stat',
      gutter: 20,
    });

    setTimeout(() => {
        const packery = new Packery(packeryRef.current, {
            itemSelector: '.stat',
            gutter: 20,
          });
      
          // Re-layout after content changes
          return () => {
            packery.layout();
          };
    }, 500);

    // Re-layout after content changes
    return () => {
      packery.layout();
    };
  }, [sort,statistics,view]);
  
  useEffect(()=>{
    if(sort !== ""){
      setView("list")
    }
  },[sort])


  return (
    <>
      <div className='App' style={{}}>
      <GradientBackground colors={currentHovered.colors} />
        <div className='controls'>
          <div className='sort'>
            <h3>Sort by </h3>
            <LuTimer className={`icon ${sort == "time" ? "selected": ""}`} onClick={()=>setSort(sort != "time" ? "time" : "")}/>
            <RiAwardLine className={`icon ${sort == "achivements" ? "selected": ""}`} onClick={()=>setSort(sort != "achivements"  ? "achivements"  : "")}/>
            <GoGraph className={`icon ${sort == "stats" ? "selected": ""}`} onClick={()=>setSort(sort != "stats" ? "stats" : "")}/>
          </div>
          <div className='sort'>
            <h3>View </h3>
            <BsGrid3X3GapFill className={`icon ${view == "grid" ? "selected": ""}`} onClick={()=>setView("grid")}/>
            <FaList className={`icon ${view == "list" ? "selected": ""}`} onClick={()=>setView("list")}/>
          </div>
        </div>

        <div className={`statistics-container ${view}`} ref={packeryRef}>
            {statistics.map((stat,index) => (
              <Stat stat={stat} sort={sort} view={view} setCurrentHovered={setCurrentHovered}/>
            ))}
        </div>
      </div>
    </>
  )
}

export default App
