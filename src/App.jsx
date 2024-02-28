import React, { useCallback, useState } from "react";
import "./App.css";
import { getWeatherForCities } from "./Api";

function App() {
  const [data, setData] = useState();
  const [cities, setCities] = useState("");
  
  const getData = useCallback(() => {
    getWeatherForCities(cities).then((res) => {
      setData(res.data.filter((city) => city.status !== "Error"));
    });
  }, [cities]);

  const renderData = () =>
    data && (data.error || data.length === 0) ? (
      <div>
        OOps, we failed to get data. Please check you city name or try again{" "}
      </div>
    ) : (
      data.map((city) => (
        <>
          <br />
          <br />
          <div>City Name: {city.name}</div>
          <div>Current Temperature{city.temp}</div>
          <div>Weather Description{city.description}</div>
          <div>Humidity{city.humidity}</div>
          <div>Wind Speed{city.windSpeed}</div>
        </>
      ))
    );

  return (
    <div className="App">
      Insert a city or more - seperated by commas
      <input onChange={(e) => setCities(e.target.value)}></input>
      <button disabled={cities.length === 0} onClick={getData}>
        Get Weather
      </button>
      <div>{data && renderData()}</div>
    </div>
  );
}

export default App;
