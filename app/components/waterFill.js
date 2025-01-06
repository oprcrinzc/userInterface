'use client'

import Card from "./card"
import { useEffect, useState, useRef } from "react"

export default function waterFill(props){
    const [FillAt, setFillAt] = useState(props.water_level_to_fill)
    const [Until, setUntil] = useState(props.water_level_target)

    const [error, setError] = useState(null);

    const FillAtRef = useRef(FillAt)
    const UntilRef = useRef(Until)

    const handleFillAtChange = async (e)=>{setFillAt(parseInt(e.target.value))}
    const handleUntilChange = async (e)=>{setUntil(parseInt(e.target.value))}


    const updateWaterLevelTarget = async () => {
      try {
        const response = await fetch(`http://192.168.21.185:8888/update/workers/${props.name}`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json", // Set appropriate headers for JSON payload
            },
          body: JSON.stringify({
              id: props.id,
              water_level_target: parseInt(Until),
            })
        }); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
      //   setData(result);
      } catch (error) {
        setError(error);
      }
    };


    const updateWaterLevelToFill = async () => {
      try {
        const response = await fetch(`http://192.168.21.185:8888/update/workers/${props.name}`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json", // Set appropriate headers for JSON payload
            },
          body: JSON.stringify({
              id: props.id,
              water_level_to_fill: parseInt(FillAt),
            })
        }); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
      //   setData(result);
      } catch (error) {
        setError(error);
      }
    };

    
    useEffect(() => {
      // setUntil(props.water_level_target)
      FillAtRef.current = FillAt;
      UntilRef.current = Until;
      let up = document.getElementById("until_progress")
      let fp = document.getElementById("fillAt_progress")
      // up.style.width = `${UntilRef.current}%`
      // fp.style.width = `${FillAtRef.current}%` 

      up.style.clipPath = `rect(0% ${UntilRef.current}% 100% 0% )`
      fp.style.clipPath = `rect(0% ${FillAtRef.current}% 100% 0%)` 

    }, [FillAt, Until]);


    useEffect(()=>{updateWaterLevelToFill()},[FillAt])
    useEffect(()=>{updateWaterLevelTarget()},[Until])


    useEffect(()=>{setUntil(props.water_level_target)}, [props.water_level_target])
    useEffect(()=>{setFillAt(props.water_level_to_fill)}, [props.water_level_to_fill])


    useEffect(()=>{
        setInterval(async () => {
            if (FillAtRef.current>UntilRef.current){
                setUntil(FillAtRef.current)
            }
          }, 0); // 1000ms = 1 second
    }, [])

    return <Card role="data">
    <h1>เติมน้ำตอนน้ำเหลือ</h1>
    <div>
        <fieldset>
            <input className="range" id="fillAt_range" type="range" min="0" max="100" value={FillAt} onChange={handleFillAtChange}/>
            <div className="progress" id="fillAt_progress"></div>
            <div className="twoBIG">
                <p id="fillAt">{FillAt}</p>
                <p>%</p>
            </div>
        </fieldset>
    </div>
    <h1>จนถึง</h1>
    <fieldset>
        <input className="range" id="until_range" type="range" min="0" max="100" value={Until} onChange={handleUntilChange}/>
        <div className="progress" id="until_progress"></div>
        <div className="twoBIG">
            <p id="until">{Until}</p>
            <p>%</p>
        </div>
    </fieldset>
</Card>
}