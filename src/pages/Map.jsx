import PropTypes from "prop-types";
import {  useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import {useUrlPosition} from './../hooks/useUrlPosition'
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import Button from "./Button";
// useMap
export default function Map() {
  useNavigate();
  // const [searchParams,setSearchParams]=useSearchParams()
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
 
  const {lat,lng }= useUrlPosition();
  useEffect(() => {
    if (lat && lng) 
      setMapPosition([lat, lng]);
  }, [lat, lng]);
  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);
  const { cities } = useCities();
  return (
    <div className={styles.mapContainer}>
     {!geolocationPosition&& <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "Loading Position" : "use your location"}
      </Button>}
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>
                {city.emoji} {city.cityName}
              </span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position, 7);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

ChangeCenter.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
};
