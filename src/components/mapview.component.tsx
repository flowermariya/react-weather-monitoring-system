import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

function MapViewComponent() {
  const [minMaxValue, setMinMaxValue] = useState<any[]>([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCmium35X1a16xPWmH2Z1nJ0EQX9sl59fQ",
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
        `http://localhost:3001/location/getMinMaxTemp`
      );
      setMinMaxValue(res.data);
    } catch (error) {
      console.error("Error fetching getMinMaxPoints:", error);
    }
  };

  useEffect(() => {
    getMinMaxPoints();
  }, []);

  const currentTemp: any = {
    "10.5256264-76.2132542": -6,
  };

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
            if (currentTemp[`${lat}-${lng}`] > parseInt(max_temp)) {
              label = "HOT";
            } else if (currentTemp[`${lat}-${lng}`] < parseInt(min_temp)) {
              label = "COLD";
            }

            return (
              <Marker
                position={{ lat, lng }}
                // icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
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
