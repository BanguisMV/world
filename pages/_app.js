import React, { Fragment } from 'react'
import '../styles/global.css'
import '../styles/bootstrap-grid.min.css'
import 'leaflet/dist/leaflet.css'


const MyApp = ({ Component, pageProps }) => {

  return (
    <Fragment>
            <main>
                <Component {...pageProps} /> 
            </main>
    </Fragment>
  
  )
}

export default MyApp
