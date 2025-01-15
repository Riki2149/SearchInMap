
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


export default function Map({ markAddress }) {
    // מערך השומר את הכתובת שהתקבלה בקומפוננטה
  const position = [markAddress.lat, markAddress.lon];

//פונקציית עדכון המיקום במפה 
//המופעלת ע"י התגית הזהה לשם הפונקציה ותופעל בעת הפעלת הקןמפוננטה
function UpdateMapCenter({ center }) {
      const map = useMap();
    // העברת המיקום בצורה מעניינת ע"י תעופה
      map.flyTo(center, map.getZoom());
      return null;
  }

  return (<>
      <div style={{ height: "50vh", width: "50vw" }}>
          <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "50vh", width: "50vw"  }}>
              <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* הסמן על המפה שמראה את המיקום המדויק */}
              <Marker position={position}>
                {/* הצגת הודעה קופצת בעת עמידה על הסמן במפה */}
                  <Popup>
                     Your address
                  </Popup>
              </Marker>
              <UpdateMapCenter center={position} />
          </MapContainer>
      </div>
  </>);
}
