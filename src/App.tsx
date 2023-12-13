import React, { useEffect, useState } from "react";
import {
  AutoComplete,
  Avatar,
  Button,
  Card,
  Col,
  List,
  Modal,
  Row,
} from "antd";
import axios from "axios";
import { kelvinToCelsius } from "./utils/convertToFarenHeat";
import "../src/style.css";

const App: React.FC = () => {
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [autoCompleteValue, setAutoCompleteValue] = useState<string>("");
  const [weatherForecast, setWeatherForecast] = useState<any[]>([]);
  const [locationHistory, setLocationHistory] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    const body = {
      city_name,
      latitude: lat,
      longitude: lon,
      body: forecastRes?.data,
    };
    const savedData = await axios.post(
      `http://localhost:3001/location/add`,
      body
    );
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

  const getLocationHistory = async () => {
    const res = await axios.get(`http://localhost:3001/location/getAll`);
    console.log(">>res", res?.data);

    setLocationHistory(res?.data);
  };

  useEffect(() => {
    getLocationHistory();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log(">>locationHistory", locationHistory);

  return (
    <>
      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
        Button
      </button>
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        value={autoCompleteValue}
        onChange={(text) => setAutoCompleteValue(text)}
        onSelect={onSelect}
        onSearch={(text) => getCity(text)}
        placeholder="Enter city name here..."
      />
      <Button onClick={() => onSelect(autoCompleteValue)}>Search</Button>
      {weatherForecast[0] && (
        <Row>
          <Card title={weatherForecast[0]?.dt_txt} bordered={false}>
            <p>
              Temperature: {kelvinToCelsius(weatherForecast[0]?.main?.temp)}
            </p>
            <p>
              Feels Like:{" "}
              {kelvinToCelsius(weatherForecast[0]?.main?.feels_like)}
            </p>
            <p>
              Max Temperature:{" "}
              {kelvinToCelsius(weatherForecast[0]?.main?.temp_max)}
            </p>
            <p>
              Min Temperature:{" "}
              {kelvinToCelsius(weatherForecast[0]?.main?.temp_min)}
            </p>
            <p>Humidity: {weatherForecast[0]?.main?.humidity}</p>
            <p>Pressure: {weatherForecast[0]?.main?.pressure}</p>
            <p>Wind Speed: {weatherForecast[0]?.wind?.speed}</p>
            <p>Weather: {weatherForecast[0]?.weather?.[0]?.main}</p>
          </Card>
        </Row>
      )}

      <Row gutter={16}>
        {weatherForecast?.map((item: any) => (
          <Col span={8}>
            <Card title={item?.dt_txt} bordered={false}>
              <p>Temperature: {item?.main?.temp}</p>
              <p>Humidity: {item?.main?.humidity}</p>
              <p>Wind Speed: {item?.wind?.speed}</p>
            </Card>
          </Col>
        ))}
      </Row>

      <>
        <Button type="primary" onClick={showModal}>
          Location History
        </Button>
        <Modal
          title="Location History"
          open={isModalOpen}
          onCancel={handleCancel}
        >
          <List
            itemLayout="horizontal"
            dataSource={locationHistory}
            renderItem={(item, index) => {
              const weatherDetails = item?.body?.[0];
              const weatherMain = weatherDetails?.main;
              const weather = weatherDetails?.weather?.[0];

              return (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`http://openweathermap.org/img/wn/${weather?.icon}.png`}
                      />
                    }
                    title={<a href="https://ant.design">{item.city_name}</a>}
                    description={
                      <>
                        <div>{weatherDetails?.dt_txt}</div>
                        <div>Temp: {weatherMain?.temp} K</div>{" "}
                        <div>Feels Like: {weatherMain?.feels_like} K</div>{" "}
                        <div>Humidity: {weatherMain?.humidity}%</div>
                        <div>Pressure: {weatherMain?.pressure} hPa</div>
                        <div>Wind Speed: {weatherDetails?.wind?.speed} m/s</div>
                        <div>Weather: {weather?.description}</div>
                      </>
                    }
                  />
                </List.Item>
              );
            }}
          />
        </Modal>
      </>
    </>
  );
};

export default App;
