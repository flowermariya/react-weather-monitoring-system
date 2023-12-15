interface WeatherData {
  main: {
    temp_max: number;
    temp_min: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
  };
  weather: { main: string; description: string; icon: string }[];
  wind: { speed: number };
  key?: string;
  data: any;
  dt: number;
}

export interface ForecastProps {
  weatherForecast: WeatherData[];
  autoCompleteValue: string;
  latitude: string;
  longitude: string;
}
