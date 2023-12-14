import React, { useEffect, useState } from "react";
import { AutoComplete, Button, Card, Col, Row } from "antd";
import axios from "axios";
import { kelvinToCelsius } from "./utils/convertToFarenHeat";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import HistoryPage from "./components/history.page";
import MainPage from "./components/main.page";

const App: React.FC = () => {
  const [options, setOptions] = useState<{ value: string }[]>([]);
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
    await axios.post(`http://localhost:3001/location/add`, body);
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

  console.log(">>weatherForecast", weatherForecast[0]);

  return (
    <Router>
      <div
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/streetlights-cloudy-day_23-2148098648.jpg?w=1060&t=st=1702548430~exp=1702549030~hmac=8916f9f0a36ae429b545e7ce39c888089c45777387b766e06b91cf37aff30682')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <br />
                <div className="container mx-auto p-4">
                  <MainPage />
                  <br />
                  {hasSearched && (
                    <>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg">Chiang Mai</p>
                          <h1 className="text-6xl font-bold">
                            {kelvinToCelsius(
                              weatherForecast[0]?.main?.temp_max
                            )}
                          </h1>
                          <p className="text-gray-400">
                            {weatherForecast[0]?.weather?.[0]?.main}
                          </p>
                          <div className="text-lg">Today</div>{" "}
                        </div>
                      </div>
                      <br />
                      <Row gutter={16}>
                        <Col className="text-gray-400" span={4}>
                          <Card
                            bordered={false}
                            style={{ backgroundColor: "#bae6fd" }}
                          >
                            <h3 className="font-bold text-xl mb-2">Humidity</h3>
                            <div className="flex items-center justify-between">
                              <p className="text-gray-400 text-lg">
                                {weatherForecast[0]?.main?.humidity}%
                              </p>
                              <img
                                src="https://icons.veryicon.com/png/o/weather/weather-related-flat/humidity-25.png"
                                alt="Humidity"
                                className="h-12 w-12"
                              />
                            </div>
                          </Card>
                          <br />
                        </Col>
                        <Col className="text-gray-400" span={4}>
                          <Card
                            bordered={false}
                            style={{ backgroundColor: "#fee2e2" }}
                          >
                            <h3 className="font-bold text-xl mb-2">Pressure</h3>
                            <div className="flex items-center justify-between">
                              <p className="text-gray-400 text-lg">
                                {weatherForecast[0]?.main?.pressure}
                              </p>
                              <img
                                src="https://icons.veryicon.com/png/o/construction-tools/construction-software-icon/earth-pressure-gauge.png"
                                alt="Pressure"
                                className="h-12 w-12"
                              />
                            </div>
                          </Card>
                        </Col>
                        <Col className="text-gray-400" span={4}>
                          <Card
                            bordered={false}
                            style={{ backgroundColor: "#f5d0fe" }}
                          >
                            <h3 className="font-bold text-xl mb-2">
                              Wind Speed
                            </h3>
                            <div className="flex items-center justify-between">
                              <p className="text-gray-400 text-lg">
                                {weatherForecast[0]?.wind?.speed}
                              </p>
                              <img
                                src=" https://icons.veryicon.com/png/o/miscellaneous/smart-home-2/wind-speed-11.png"
                                alt="Wind"
                                className="h-12 w-12"
                              />
                            </div>
                          </Card>
                        </Col>
                        <Col className="text-gray-400" span={4}>
                          <Card
                            bordered={false}
                            style={{ backgroundColor: "#fed7aa" }}
                          >
                            <h3 className="font-bold text-xl mb-2">
                              Feels Like
                            </h3>
                            <div className="flex items-center justify-between">
                              <p className="text-gray-400 text-lg">
                                {kelvinToCelsius(
                                  weatherForecast[0]?.main?.feels_like
                                )}
                              </p>
                              <img
                                src="https://icons.veryicon.com/png/o/miscellaneous/base-icon-library-1/cloud-101.png"
                                alt="Feels"
                                className="h-12 w-12"
                              />
                            </div>
                          </Card>
                        </Col>
                        <Col className="text-gray-400" span={4}>
                          <Card
                            bordered={false}
                            style={{ backgroundColor: "#e5e5e5" }}
                          >
                            <h3 className="font-bold text-xl mb-2">
                              Min Temperature
                            </h3>
                            <div className="flex items-center justify-between">
                              <p className="text-gray-400 text-lg">
                                {kelvinToCelsius(
                                  weatherForecast[0]?.main?.temp_min
                                )}
                              </p>
                              <img
                                src="https://icons.veryicon.com/png/o/weather/color-flattened-weather-icon/air-temperature-low-temperature.png"
                                alt="Min"
                                className="h-12 w-12"
                              />
                            </div>
                          </Card>
                        </Col>
                        <Col className="text-gray-400" span={4}>
                          <Card
                            bordered={false}
                            style={{ backgroundColor: "#fef08a" }}
                          >
                            <h3 className="font-bold text-xl mb-2">
                              Max Temperature
                            </h3>
                            <div className="flex items-center justify-between">
                              <p className="text-gray-400 text-lg">
                                {kelvinToCelsius(
                                  weatherForecast[0]?.main?.temp_max
                                )}
                              </p>
                              <img
                                src="https://icons.veryicon.com/png/o/weather/color-flattened-weather-icon/air-temperature-high-temperature.png"
                                alt="Max"
                                className="h-12 w-12"
                              />
                            </div>
                          </Card>
                        </Col>
                      </Row>
                      <p className="text-gray-400 text-lg">Upcoming Weathers</p>
                      <br />
                      <Row gutter={16}>
                        {weatherForecast?.map((item: any) => (
                          <Col className="text-gray-400" span={8}>
                            <Card
                              title={item?.key}
                              bordered={false}
                              style={{ backgroundColor: "#e7e5e4" }}
                            >
                              <p>Temperature: {item?.main?.temp}</p>
                              <p>Humidity: {item?.main?.humidity}</p>
                              <p>Wind Speed: {item?.wind?.speed}</p>
                            </Card>
                            <br />
                          </Col>
                        ))}
                      </Row>
                    </>
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
