import React, { useCallback, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HistoryPage from "./components/history.component";
import MainPage from "./components/main.component";
import ForecastComponent from "./components/forecast.component";
import "./style.css";
import MapViewComponent from "./components/mapview.component";
const debounce = require("lodash.debounce");

const App: React.FC = () => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [autoCompleteValue, setAutoCompleteValue] = useState<string>("");
  const [weatherForecast, setWeatherForecast] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");

  const onSelect = async (data: string) => {
    if (!data) {
      return;
    }
    const city_name = data?.split("-")[0];
    setAutoCompleteValue(city_name);
    const lat = data?.split("-")[3];
    const lon = data?.split("-")[4];

    setLatitude(lat);
    setLongitude(lon);

    if (!lat || !lon) {
      return;
    }
    const forecastRes = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getWeatherForecast?lat=${lat}&lon=${lon}`
    );
    setWeatherForecast(forecastRes?.data);
    setHasSearched(true);

    const body = {
      city_name,
      latitude: lat,
      longitude: lon,
      body: forecastRes?.data,
    };
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/add`, body);
  };

  const getCity = async (data: string) => {
    if (!data) {
      return;
    }
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getCity?search_text=${data}`
    );

    console.log(">>res", res.data);

    const autoComplete = res?.data?.map((item: any) => ({
      value: `${item?.name}-${item?.state}-${item?.country}-${item?.lat}-${item?.lon}`,
      label: item?.name,
    }));

    setOptions(autoComplete);
  };

  const debouncedSearch = useCallback(debounce(getCity, 500), []);

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <div className="container mx-auto p-4">
                  <MainPage
                    autoCompleteOptions={options}
                    autoCompleteValue={autoCompleteValue}
                    setAutoCompleteValue={setAutoCompleteValue}
                    onSelectCity={onSelect}
                    onSearchCity={debouncedSearch}
                  />
                  <br />
                  {hasSearched && (
                    <ForecastComponent
                      weatherForecast={weatherForecast}
                      autoCompleteValue={autoCompleteValue}
                      latitude={latitude}
                      longitude={longitude}
                    />
                  )}
                </div>
              </div>
            }
          />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/mapView" element={<MapViewComponent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
