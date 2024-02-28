import React, { useCallback, useState } from "react";
import { Box, Card, CardContent, Container } from "@mui/material";
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
        <Box sx={{ minWidth: 30 }}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 3,
              margin: 6,
            }}
          >
            <CardContent>City Name: {city.name}</CardContent>
            <CardContent>Current Temperature: {city.temp}</CardContent>
            <CardContent>Weather Description: {city.description}</CardContent>
            <CardContent>Humidity: {city.humidity} </CardContent>

            <CardContent>Wind Speed: {city.windSpeed} </CardContent>
          </Card>
        </Box>
      ))
    );

  return (
    <Container>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 3,
          margin: 6,
        }}
      >
        <CardContent>Insert a city or more - seperated by commas</CardContent>
        <CardContent>
          <input onChange={(e) => setCities(e.target.value)}></input>
        </CardContent>
        <CardContent>
          <button disabled={cities.length === 0} onClick={getData}>
            Get Weather
          </button>
        </CardContent>
      </Card>
      <div style={{ color: "red" }}>{data && renderData()}</div>
    </Container>
  );
}

export default App;
