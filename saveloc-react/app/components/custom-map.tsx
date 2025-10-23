import { latLng, type LatLng, type LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

function MapEvents(props: CustomMapProps) {
  const [markerPosition, setMarkerPosition] = useState<LatLngExpression | null>(
    null
  );

  const map = useMapEvents({
    click: (cl) => {
      if (!props.selectable) return;
      setMarkerPosition(cl.latlng);
      props.onSelect(cl.latlng);
    },
    locationfound: (location) => {
      map.panTo(location.latlng);
      setMarkerPosition(location.latlng);
      props.onSelect(location.latlng);
    },
  });

  useEffect(() => {
    if (props.center == null) map.locate();
    else if (props.center != null) {
      map.panTo(props.center);
      setMarkerPosition(props.pin);
    }
  }, [props.center]);

  if (markerPosition != null)
    return (
      <Marker position={markerPosition}>
        <Popup></Popup>
      </Marker>
    );
  else return <></>;
}
type CustomMapProps = {
  selectable: boolean;
  center: LatLngExpression | null;
  pin: LatLngExpression | null;
  onSelect: (latlng: LatLng) => void;
};
export default function CustomMap(props: CustomMapProps) {
  return (
    <MapContainer
      className="size-96 min-h-96"
      center={[0, 0]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEvents
        selectable={props.selectable}
        center={props.center}
        pin={props.pin}
        onSelect={props.onSelect}
      />
    </MapContainer>
  );
}
