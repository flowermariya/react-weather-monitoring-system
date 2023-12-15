import React, { useState } from "react";
import { Row, Card, Col, Button, Modal } from "antd";
import { kelvinToCelsius } from "../utils/convertToFarenHeat";
import { ForecastProps } from "../utils/interfaces/forecast.interface";
import axios from "axios";
import { MinMaxComponent } from "./minmax.component";

const ForecastComponent: React.FC<ForecastProps> = ({
  weatherForecast,
  autoCompleteValue,
  latitude,
  longitude,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (minTemp: number, maxTemp: number) => {
    const body = {
      min_temp: minTemp,
      max_temp: maxTemp,
      location_id: "",
      location_name: autoCompleteValue,
      lat: latitude,
      lng: longitude,
    };

    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/saveMinMaxTemp`,
      body
    );

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log(">>weatherForecast", weatherForecast);

  return (
    <>
      <div className="flex flex-wrap justify-center items-start">
        <div className="bg-blue-400 bg-gradient-to-b from-blue-500 to-blue-300 p-8 rounded-3xl shadow-xl text-white w-96 h-86">
          <div className="flex justify-between items-center">
            <div className="text-4xl font-semibold">
              {kelvinToCelsius(weatherForecast[0]?.main?.temp)}
            </div>
            <div className="bg-white rounded-full p-1">
              <MinMaxComponent
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                showModal={showModal}
              />
            </div>
          </div>
          <div className="text-center mt-4">
            <div className="text-6xl">☀️</div>
            <div className="text-2xl font-semibold">
              {weatherForecast[0]?.weather?.[0]?.main}
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-lg font-medium">{autoCompleteValue}</p>
            <div className="flex justify-center gap-8 mt-2">
              <div>
                <span className="font-bold text-lg">
                  {weatherForecast[0]?.main?.humidity}%
                </span>{" "}
                Humidity
              </div>
              <div>
                <span className="font-bold text-lg">
                  {weatherForecast[0]?.wind?.speed} Km/h
                </span>{" "}
                Wind Speed
              </div>
              <div>
                <span className="font-bold text-lg">
                  {weatherForecast[0]?.main?.pressure}
                </span>{" "}
                Pressure
              </div>
              <div>
                <span className="font-bold text-lg">
                  {kelvinToCelsius(weatherForecast[0]?.main?.feels_like)}
                </span>{" "}
                Feels Like
              </div>
            </div>
          </div>
        </div>
        {/* showmin and max temp */}
        <br />
      </div>
      <h2 className="text-lg font-semibold text-gray-400 mt-6 mb-4">
        Upcoming Weathers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6 p-4">
        {weatherForecast?.map((item: any, index: number) => (
          <div
            key={index}
            className="transform transition duration-500 hover:scale-105 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl"
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-xl text-gray-800">{item.key}</h2>
                <img
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt={item.weather[0].description}
                />
              </div>
              <div className="mt-2">
                <p className="text-gray-700 font-light">
                  Temperature: {kelvinToCelsius(item?.main?.temp)}°C
                </p>
                <p className="text-gray-700 font-light">
                  Humidity: {item?.main?.humidity}%
                </p>
                <p className="text-gray-700 font-light">
                  Pressure: {item?.main?.pressure}
                </p>
                <p className="text-gray-700 font-light">
                  Wind: {item?.wind?.speed} km/h
                </p>
                <p className="text-gray-700 font-light">
                  Feels Like: {kelvinToCelsius(item?.main?.feels_like)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ForecastComponent;
