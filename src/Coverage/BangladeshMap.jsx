import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const dhakaCenter = [23.8103, 90.4125];

// Component to update map position
const FlyToLocation = ({ position }) => {
  const map = useMap();
  if (position) {
    map.flyTo(position, 10);
  }
  return null;
};

const BangladeshMap = ({ serviceCenters }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedPosition, setSelectedPosition] = useState(null);

  const handleSearch = () => {
    const result = serviceCenters.find(center =>
      center.district.toLowerCase().includes(searchText.toLowerCase())
    );
    if (result) {
      setSelectedPosition([result.latitude, result.longitude]);
    } else {
      alert('District not found.');
    }
  };

  return (
    <div className="mt-6">
      {/* Search bar */}
      <div className="flex mb-4 gap-2">
        <input
          type="text"
          placeholder="Search district..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="p-2 border rounded w-full"
        />
        <button onClick={handleSearch} className="px-4 py-2 bg-blue-600 text-white rounded">
          Search
        </button>
      </div>

      {/* Map */}
      <div className="w-full h-[500px] rounded shadow overflow-hidden">
        <MapContainer center={dhakaCenter} zoom={15} scrollWheelZoom className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FlyToLocation position={selectedPosition} />

          {serviceCenters.map((center, idx) => (
            <Marker key={idx} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong>
                <p>{center.status}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default BangladeshMap;
