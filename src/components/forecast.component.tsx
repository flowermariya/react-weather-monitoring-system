import React from "react";
import { Row, Card, Col } from "antd";
import { kelvinToCelsius } from "../utils/convertToFarenHeat";

interface WeatherData {
  main: {
    temp_max: number;
    temp_min: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: { main: string; description: string }[];
  wind: { speed: number };
  key?: string;
}

interface ForecastProps {
  weatherForecast: WeatherData[];
  autoCompleteValue: string;
}

const ForecastComponent: React.FC<ForecastProps> = ({
  weatherForecast,
  autoCompleteValue,
}) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg">{autoCompleteValue}</p>
          <h1 className="text-6xl font-bold">
            {kelvinToCelsius(weatherForecast[0]?.main?.temp_max)}
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
          <br />
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
  );
};

export default ForecastComponent;
