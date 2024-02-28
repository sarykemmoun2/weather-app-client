import axios from "axios";

export const getWeatherForCities = (cities: string) => {
  return axios.get(`http://localhost:5000/weather?cities=${cities}`);
}