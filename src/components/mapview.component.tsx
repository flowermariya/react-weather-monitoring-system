import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { kelvinToCelsius } from "../utils/convertToFarenHeat";

function MapViewComponent() {
  const [minMaxValue, setMinMaxValue] = useState<any[]>([]);
  const [currentTemperatures, setCurrentTemperatures] = useState({}) as any;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY as string,
  });

  const center = useMemo(() => ({ lat: 10.5256264, lng: 76.2132542 }), []);

  const customMarker = {
    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z",
    fillColor: "red",
    fillOpacity: 1,
    strokeWeight: 1,
    rotation: 0,
    scale: 2,
  };

  const onLoad = (map: any) => {
    const bounds = new google.maps.LatLngBounds();
    minMaxValue?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };

  const getMinMaxPoints = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getMinMaxTemp`
      );
      setMinMaxValue(res.data);
    } catch (error) {
      console.error("Error fetching getMinMaxPoints:", error);
    }
  };

  useEffect(() => {
    const fetchTemperatures = async () => {
      const tempData: any = {};

      for (const location of minMaxValue) {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/getWeatherForecast?lat=${location.lat}&lon=${location.lng}`
          );
          let currentTemp = res?.data?.[0]?.main.temp;
          currentTemp = kelvinToCelsius(currentTemp);
          tempData[`${location.lat}-${location.lng}`] = currentTemp;
        } catch (error) {
          console.error("Error fetching temperature for location", error);
        }
      }

      setCurrentTemperatures(tempData);
    };

    if (minMaxValue.length > 0) {
      fetchTemperatures();
    }
  }, [minMaxValue]);

  useEffect(() => {
    getMinMaxPoints();
  }, []);

  return (
    <div className="homepage">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={6}
          onLoad={onLoad}
        >
          {minMaxValue.map(({ lat, lng, min_temp, max_temp }) => {
            let label = "";
            if (currentTemperatures[`${lat}-${lng}`] > max_temp) {
              label = "HOT";
            } else if (currentTemperatures[`${lat}-${lng}`] < min_temp) {
              label = "COLD";
            }

            return (
              <Marker
                position={{ lat, lng }}
                icon={customMarker}
                label={label}
              />
            );
          })}
        </GoogleMap>
      )}
    </div>
  );
}

export default MapViewComponent;
