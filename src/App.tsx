import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HistoryPage from "./components/history.component";
import MainPage from "./components/main.component";
import ForecastComponent from "./components/forecast.component";
import "./style.css";

const App: React.FC = () => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [autoCompleteValue, setAutoCompleteValue] = useState<string>("");
  const [weatherForecast, setWeatherForecast] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const onSelect = async (data: string) => {
    if (!data) {
      return;
    }
    const city_name = data?.split("-")[0];
    setAutoCompleteValue(city_name);
    const lat = data?.split("-")[3];
    const lon = data?.split("-")[4];

    if (!lat || !lon) {
      return;
    }
    const forecastRes = await axios.get(
      `http://localhost:3001/location/getWeatherForecast?lat=${lat}&lon=${lon}`
    );
    setWeatherForecast(forecastRes?.data);
    setHasSearched(true);

    const body = {
      city_name,
      latitude: lat,
      longitude: lon,
      body: forecastRes?.data,
    };
    await axios.post(`http://localhost:3001/location/addLocation`, body);
  };

  const getCity = async (data: string) => {
    if (!data) {
      return;
    }
    const res = await axios.get(
      `http://localhost:3001/location/getCity?search_text=${data}`
    );
    const autoComplete = res?.data?.map((item: any) => ({
      value: `${item?.name}-${item?.state}-${item?.country}-${item?.lat}-${item?.lon}`,
      label: item?.name,
    }));

    setOptions(autoComplete);
  };

  return (
    <Router>
      <div className="homepage">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <br />
                <div className="container mx-auto p-4">
                  <MainPage
                    autoCompleteOptions={options}
                    onSelectCity={onSelect}
                    onSearchCity={getCity}
                  />
                  <br />
                  {hasSearched && (
                    <ForecastComponent
                      weatherForecast={weatherForecast}
                      autoCompleteValue={autoCompleteValue}
                    />
                  )}
                </div>
              </div>
            }
          />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
