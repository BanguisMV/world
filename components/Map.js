import { MapContainer, TileLayer, Marker,CircleMarker, Popup, Circle } from 'react-leaflet'
import L from 'leaflet';



import useMedia from 'use-media';

const redOptions = { color: 'orange' }

const Map = ({ volcanoes }) => {
    const mobile = useMedia({maxWidth: 500});
    const position = [9.7571, 125.5138]
    console.log(volcanoes);
      return (
        <MapContainer 
        style={{ height: '100vh', width: '100%' }}
        center={position} 
        zoom={mobile ? 8 : 6} 
        scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />

        {volcanoes.features.map(feature => (
            <CircleMarker 
              key={feature.properties.VolcanoID}
              center={[feature.properties.Latitude, feature.properties.Longitude]} 
              pathOptions={redOptions} 
              radius={mobile ? 5 : 4}>
            <Popup>
              <div>
                <h1> {feature.properties.V_Name} Volcano </h1>
                <p> Status: {feature.properties.H_active === 1  ? 'Active' : 'Inactive'}</p>
                <p> Erupted: {feature.properties.VEI_Holoce} </p>
              </div>
              </Popup>
            </CircleMarker>

          // <Marker
          // radius={10}
          // key={feature.properties.VolcanoID}
          // icon={myIcon} 
          // position={[feature.properties.Latitude, feature.properties.Longitude]}/>
        ))}
      </MapContainer>
      )
    }
    
export default Map
const myIcon = L.icon({
  iconUrl: 'https://world.vercel.app/volcano.png',
  iconAnchor: [25, 41],
  iconSize: [50, 60],
  popupAnchor: [0, -41]
})

//https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png
//https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}
//https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}