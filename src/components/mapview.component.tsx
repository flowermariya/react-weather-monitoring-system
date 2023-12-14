import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";

function MapViewComponent() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCmium35X1a16xPWmH2Z1nJ0EQX9sl59fQ",
  });

  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  console.log(">>isLoaded", isLoaded);

  return (
    <div className="homepage">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
        >
          <Marker position={{ lat: 18.52043, lng: 73.856743 }} />
        </GoogleMap>
      )}
    </div>
  );
}

export default MapViewComponent;
