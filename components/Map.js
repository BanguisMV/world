import { MapContainer, TileLayer,Marker, Popup } from 'react-leaflet'
import useMedia from 'use-media';

//https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png
//https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}
//https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}
const Map = () => {
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
          url="https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}"
        />
        {/* <Marker position={position}  onClick={console.log('Marker Clicked!')}>
          <Popup >
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </MapContainer>
      )
    }
    
    export default Map