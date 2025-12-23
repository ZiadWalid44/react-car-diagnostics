import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // مهم جداً عشان الخريطة تظهر صح

// إصلاح مشكلة الأيقونات في Leaflet مع React
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const ServiceLocator = () => {
  // إحداثيات القاهرة (ممكن نغيرها لأي مكان)
  const position = [30.0444, 31.2357];

  const centers = [
    { id: 1, name: "AutoCare Main Center", coords: [30.0444, 31.2357], type: "Official" },
    { id: 2, name: "Nasr City Workshop", coords: [30.0561, 31.3301], type: "Partner" },
    { id: 3, name: "Maadi Quick Fix", coords: [29.9592, 31.2595], type: "Partner" },
    { id: 4, name: "Giza Service Hub", coords: [30.0131, 31.2089], type: "Official" },
  ];

  return (
    <div className="p-4 h-[80vh]">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-brand-900">Nearby Service Centers 📍</h2>
        <p className="text-gray-600">Find the nearest certified workshop.</p>
      </div>

      <div className="h-full rounded-xl overflow-hidden shadow-2xl border-4 border-white">
        <MapContainer center={position} zoom={11} scrollWheelZoom={true} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {centers.map(center => (
            <Marker key={center.id} position={center.coords}>
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold text-brand-900">{center.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded text-white ${center.type === 'Official' ? 'bg-blue-600' : 'bg-gray-500'}`}>
                    {center.type}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default ServiceLocator;