import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo';
const Map = dynamic(
  () => import('../components/Map'),
  { ssr: false }
)

const Home = ({volcanoes, earthquakes}) => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      volcanoes || earthquakes ? setLoaded(true) : setLoaded(false)
    },1000)
  },[])

  return (
   <main className='container'>
      <NextSeo  title="Worldcanoes" />
     {loaded ? <Map volcanoes={volcanoes} earthquakes={earthquakes} /> : 
     <h1 className='loader'>Loading<span className="dots"><span>.</span><span>.</span><span>.</span></span></h1>
     }
    </main>
  )
}
export default Home
export async function getStaticProps(context) {
  const [volcanoes, earthquakes ] = await Promise.all([
    fetch(`https://data.humdata.org/dataset/a60ac839-920d-435a-bf7d-25855602699d/resource/7234d067-2d74-449a-9c61-22ae6d98d928/download/volcano.json`).then(r => r.json()),
    fetch(`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson`).then(r => r.json())
  ]);
  return { props: { volcanoes, earthquakes }, revalidate: 1 }
  
}
// export async function getStaticProps(context) {
//   const res = await fetch(`https://data.humdata.org/dataset/a60ac839-920d-435a-bf7d-25855602699d/resource/7234d067-2d74-449a-9c61-22ae6d98d928/download/volcano.json`)
//   const volcanoes = await res.json()

//   return { props: { volcanoes }, revalidate: 1 }
// }
  
  // const res = await fetch(`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson`)
  // const earthquakes = await res.json()
  // return { props: { earthquakes }, revalidate: 1 }

