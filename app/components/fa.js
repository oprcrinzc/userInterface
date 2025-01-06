"use client"

import { useState, useEffect } from 'react';

import WaterFill from "./waterFill"
import Style from "./components.module.css"
import { redirect } from 'next/dist/server/api-utils';

export default function FetchDataComponent(props) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch function to call API
  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.21.185:8888/fetch/workers/'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
    // Start fetching data every second
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000); // 1000ms = 1 second

    // Cleanup on unmount to avoid memory leaks
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run once when the component mounts

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {props.mode == "card"?
        <div className={Style.m}>
          {
            Array.isArray(data)?
            data.map((element, index) => {
              return <div key={index} className={Style.c1}>
                <p>{element["name"]}</p>
                <div>
                  <p>{element["temperature"]} °C</p>
                  <p>{element["humidity"]} %</p>
                </div>
              </div>
            }):"Loading . . ."
          }
        </div> 


        : props.mode == "raw" ?
        <pre>
          {JSON.stringify(data, null, 2)}
        </pre> 


        : props.mode == "temperature" ?
          <pre>
          {Array.isArray(data)?
          data.map((element, index) => {
            return element["name"] == props.who ?
            <div key={index}>
                {element["temperature"]}
            </div>: ""
          }):"Loading . . ."}
        </pre>


        : props.mode == "humidity" ?
          <pre>
          {Array.isArray(data)?
          data.map((element, index) => {
            return element["name"] == props.who ?
            <div key={index}>
                {element["humidity"]}
            </div>: ""
          }):"Loading . . ."}
        </pre>


        : props.mode == "waterlevel" ?
          <pre>
          {Array.isArray(data)?
          data.map((element, index) => {
            return element["name"] == props.who ?
            <div key={index}>
                {element["water_level"]}
            </div>: ""
          }):"Loading . . ."}
        </pre>


        : props.mode == "updateWater" ?
          <pre>
          {Array.isArray(data)?
          data.map((element, index) => {
            return element["name"] == props.who ?
            <WaterFill key={index} id={element["id"]} name={element["name"]} 
            water_level_target={element["water_level_target"]}
            water_level_to_fill={element["water_level_to_fill"]}>
                {/* {element["water_level"]} */}
            </WaterFill>: ""
          }):"Loading . . ."}
        </pre>

        
        : props.mode == "individual" ?
        <div className={Style.m}>
        {
          Array.isArray(data)?
          data.map((element, index) => {
            return element["name"] == props.who ?
            <div key={index} className={Style.c1} onClick={()=>document.location.href = (`/${props.who}`)}>
              <p>{element["name"]}</p>
              <div>
                <div className="twoBIG"><p>{element["temperature"]}</p><p>°C</p></div>
                <div className="twoBIG"><p>{element["humidity"]}</p><p>%</p></div>
                <div className="twoBIG"><p>{element["water_level"]}</p><p>%</p></div>
              </div>
            </div>: ""
          }):"Loading . . ."
        }
        </div>: ""
        }

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}
