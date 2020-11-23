import { Fragment, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup} from 'react-leaflet'
import useMedia from 'use-media';

const inactive = { color: '#141412' }
const active = { color: '#d81111' }
const earthquakesColor = { color: ' #ffd900' }
const earthquakesColor2 = { color: '  #6ce41c' }

const Map = ({ volcanoes, earthquakes }) => {

  const mobile = useMedia({maxWidth: 500});
  const [openLegend, setOpenLegend] = useState(true)

    //Default Position Philippines
    const position = [12.8797, 121.7740]

      return (
        <Fragment>

{(!mobile ||  openLegend) &&
          <div className='legends'>
            <h2 className='guide'>Guide</h2>


            <div className='volcano'>
              <h2>Volcano</h2>
              <div className='total legend'>
                  <p>Approximately</p>
                  <p> <strong>{ volcanoes.features.length }</strong> </p>
                  <p> Volcanoes in Total</p>
                </div>
                <div className='active legend'>
                  <h2>Active</h2>
                </div>
                <div className='inactive legend'>
                  <h2>inactive</h2>
              </div>
            </div>  
                  

            <div className='earthquake'>
              <h2>Earthquake</h2>
                <div className='up magnitude'>
                    <h2>Magnitude &#62; 3 &#8593;</h2>
                </div>
                <div className='below magnitude'>
                    <h2>Magnitude &#60; 3 &#8595;</h2>
                </div>
            </div>
        
          </div> }

{mobile && <button className='legend_button' onClick={() => setOpenLegend(prev => !prev)}>{openLegend ? '✖':'☰'}</button> }
        
        <MapContainer 
        style={{ height: '100%', width: '100%' }}
        center={position} 
        minZoom={3}
        zoom={mobile ? 8 : 5} 
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
              pathOptions={earthquake.properties.mag > 3 ? earthquakesColor : earthquakesColor2} 
              radius={6}>
              <Popup> 
                <div>
                    <p>Magnitude: {earthquake.properties.mag}</p>
                    <p>Location: {earthquake.properties.place}</p>
                    <p>Date: {new Date(earthquake.properties.time).toDateString()}</p>
                    <p>Updated: {new Date(earthquake.properties.updated).toDateString()}</p>

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
                    <h2 className='pop_h2' > {feature.properties.V_Name} Volcano </h2>
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
