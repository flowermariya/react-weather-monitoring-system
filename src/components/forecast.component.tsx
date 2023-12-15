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

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-blue-100 border border-blue-300 rounded-xl p-4 max-w-md mx-auto">
        <div className="text-center mb-2">
          <p className="text-lg font-semibold text-gray-700">
            {autoCompleteValue}
          </p>
          <h1 className="text-6xl font-bold text-blue-700">
            {kelvinToCelsius(weatherForecast[0]?.main?.temp_max)}
          </h1>
        </div>
        <p className="text-lg font-medium text-gray-600 mb-1">
          {weatherForecast[0]?.weather?.[0]?.main}
        </p>
        <div className="bg-blue-200 text-blue-800 py-1 px-3 rounded-full font-medium mb-2">
          Today
        </div>
        <MinMaxComponent
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          showModal={showModal}
        />
      </div>

      <br />
      <Row gutter={16}>
        <Col className="text-gray-400" span={4}>
          <Card bordered={false} style={{ backgroundColor: "#bae6fd" }}>
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
        </Col>
        <Col className="text-gray-400" span={4}>
          <Card bordered={false} style={{ backgroundColor: "#fee2e2" }}>
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
          <Card bordered={false} style={{ backgroundColor: "#f5d0fe" }}>
            <h3 className="font-bold text-xl mb-2">Wind Speed</h3>
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
          <Card bordered={false} style={{ backgroundColor: "#fed7aa" }}>
            <h3 className="font-bold text-xl mb-2">Feels Like</h3>
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-lg">
                {kelvinToCelsius(weatherForecast[0]?.main?.feels_like)}
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
          <Card bordered={false} style={{ backgroundColor: "#e5e5e5" }}>
            <h3 className="font-bold text-xl mb-2">Min Temperature</h3>
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-lg">
                {kelvinToCelsius(weatherForecast[0]?.main?.temp_min)}
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
          <Card bordered={false} style={{ backgroundColor: "#fef08a" }}>
            <h3 className="font-bold text-xl mb-2">Max Temperature</h3>
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-lg">
                {kelvinToCelsius(weatherForecast[0]?.main?.temp_max)}
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
      <h2 className="text-lg font-semibold text-white mt-6 mb-4">
        Upcoming Weathers
      </h2>

      <Row gutter={16}>
        {weatherForecast?.map((item: any) => (
          <Col className="text-gray-400" span={8}>
            <Card
              title={item?.key}
              bordered={false}
              style={{ backgroundColor: "#e7e5e4" }}
            >
              <p>Temperature: {kelvinToCelsius(item?.main?.temp)}</p>
              <p>Humidity: {item?.main?.humidity}</p>
              <p>Wind Speed: {item?.wind?.speed}</p>
            </Card>
            <br />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ForecastComponent;
