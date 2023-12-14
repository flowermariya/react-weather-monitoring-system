import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, AutoComplete } from "antd";

function MainPage() {
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [autoCompleteValue, setAutoCompleteValue] = useState<string>("");
  const [weatherForecast, setWeatherForecast] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

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

  return (
    <div className="flex items-center justify-between">
      <AutoComplete
        options={options}
        style={{ width: 400 }}
        value={autoCompleteValue}
        onChange={(text) => setAutoCompleteValue(text)}
        onSelect={onSelect}
        onSearch={(text) => getCity(text)}
        placeholder="Search city"
      />

      <Button href="/history" className="your-custom-class">
        View Map
      </Button>
      <Button href="/history" className="your-custom-class">
        View History
      </Button>
    </div>
  );
}

export default MainPage;
