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

export interface ForecastProps {
  weatherForecast: WeatherData[];
  autoCompleteValue: string;
}
