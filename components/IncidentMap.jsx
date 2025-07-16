import MapView, { Marker, Circle } from 'react-native-maps';



export default function IncidentMap({ latitude, longitude }) {

    const region = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.01,     // zoom
        longitudeDelta: 0.01     // zoom
    };
  return (
    <MapView style={{ flex: 1 }} region={region}>
      <Marker coordinate={region} />
      <Circle center={region} radius={40} fillColor="red" />
    </MapView>
  );
}