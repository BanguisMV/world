import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet';

const myIcon = L.icon({
  iconUrl: 'https://www.flaticon.com/svg/static/icons/svg/1397/1397898.svg',
  iconAnchor: [25, 41],
  iconSize: [50, 60],
  popupAnchor: [0, -41]
})

import useMedia from 'use-media';


const Map = ({ volcanoes }) => {

  const mobile = useMedia({maxWidth: 500});

    const position = [9.7571, 125.5138]
      return (
        <MapContainer 
        style={{ height: '100vh', width: '100%' }}
        minZoom={3}
        center={position} 
        zoom={mobile ? 8 : 6} 
        scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position} icon={myIcon}/>
      </MapContainer>
      )
    }
    
export default Map


//https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png
//https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}
//https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}