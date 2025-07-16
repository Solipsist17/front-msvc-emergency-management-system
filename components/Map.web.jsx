import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export function Map({width, height}) {
    return (
    <MapContainer 
      center={[51.505, -0.09]} 
      zoom={13} 
      style={{ height: height || '100vh', width: width || '100%' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>¡Hola desde Leaflet!</Popup>
      </Marker>
    </MapContainer>
    );
}
