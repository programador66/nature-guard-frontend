import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import type { LatLngLiteral } from "leaflet";
import L from "leaflet";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

interface MapPickerProps {
  position: LatLngLiteral | null;
  setPosition: (pos: LatLngLiteral) => void;
}

function LocationMarker({ position, setPosition }: MapPickerProps) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function MapPicker({ position, setPosition }: MapPickerProps) {
  return (
    <MapContainer
      center={position || [-25.43, -49.27]}
      zoom={13}
      style={{ height: "180px", width: "100%" }}
      key={position?.lat}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <LocationMarker position={position} setPosition={setPosition} />
    </MapContainer>
  );
}