import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo';
const Map = dynamic(
  () => import('../components/Map'),
  { ssr: false }
)

const Home = ({volcanoes, earthquakes}) => {
console.log(earthquakes);
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      volcanoes ? setLoaded(true) : setLoaded(false)
    },1000)
  },[])

  return (
   <main className='container'>
      <NextSeo  title="Worldcanoes" />
     { loaded ?  <Map volcanoes={volcanoes} /> : 
     <h1 className='loader'>Loading...</h1>
     }
    </main>
  )
}

export default Home

export async function getStaticProps(context) {

  const [volcanoes, earthquakes] = await Promise.all([
    fetch(`https://data.humdata.org/dataset/a60ac839-920d-435a-bf7d-25855602699d/resource/7234d067-2d74-449a-9c61-22ae6d98d928/download/volcano.json`).then(r => r.json()),
    fetch(`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson`).then(r => r.json())
  ]);
  return { props: { volcanoes, earthquakes }, revalidate: 1 }
}
