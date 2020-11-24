import { Fragment } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup} from 'react-leaflet'
import useMedia from 'use-media';

const inactive = { color: '#141412' }
const active = { color: '#d81111' }
const earthquakesColor = { color: ' #ffd900' }
const earthquakesColor2 = { color: '  #6ce41c' }

const Map = ({ volcanoes, earthquakes }) => {

 
    const mobile = useMedia({maxWidth: 500});
    const position = [12.8797, 121.7740]
      return (
        <Fragment>
          <div className='legends'>
            <div className='total legend'>
                <p>Approximately</p>
                <h2>{volcanoes.features.length}</h2>
                <p> Volcanoes in Total</p>
            </div>
            <div className='active legend'>
                <h2>Active</h2>
            </div>
            <div className='inactive legend'>
                <h2>inactive</h2>
            </div>
            <div className='up magnitude'>
                <p>Magnitude 2 and up</p>
            </div>
            <div className='below magnitude'>
                <p>Magnitude 2 and below</p>
            </div>
          </div>

        <MapContainer 
        style={{ height: '100%', width: '100%' }}
        center={position} 
        minZoom={3}
        zoom={5} 
        scrollWheelZoom={false}>

        <TileLayer
          noWrap={true}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        

          {earthquakes.features.map(earthquake => (
            <CircleMarker 
              key={earthquake.id}
              center={[ earthquake.geometry.coordinates.[1], earthquake.geometry.coordinates.[0] ]} 
              pathOptions={earthquake.properties.mag > 2 ? earthquakesColor : earthquakesColor2} 
              radius={6}>

            <Popup> 
               <div>
                <p>Location: {earthquake.properties.place}</p>
                <p>Date: {new Date(earthquake.properties.time).toDateString()}</p>
                <p>Magnitude: {earthquake.properties.mag}</p>
               </div>
              </Popup> 
            </CircleMarker>
        ))}

        {volcanoes.features.map(feature => (
            <CircleMarker 
              key={feature.properties.VolcanoID}
              center={[feature.properties.Latitude, feature.properties.Longitude]} 
              pathOptions={feature.properties.H_active === 1 ? active : inactive} 
              radius={mobile ? 5 : 4}>

            <Popup className='pop_up'>
              <div className='pop_child'>
                <h4 className='pop_h1' > {feature.properties.V_Name} Volcano </h4>
                <p className='pop_p' > Status: {feature.properties.H_active === 1  ? 'Active' : 'Inactive'}</p>
                <p className='pop_p' > Erupted: {feature.properties.VEI_Holoce} </p>
              </div>
              </Popup>
            </CircleMarker>
        ))}

      </MapContainer>
      </Fragment>
      )
    }
    
export default Map
// const myIcon = L.icon({
//   iconUrl: 'https://volcano.si.edu/includes/images/volcano_icon_16.ico',
//   iconAnchor: [25, 41],
//   iconSize: [50, 60],
//   popupAnchor: [0, -41]
// })

//https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png
//https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}
//https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}