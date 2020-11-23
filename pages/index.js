import dynamic from 'next/dynamic'
import {NextSeo} from 'next-seo';
const Map = dynamic(
  () => import('../components/Map'),
  { ssr: false }
)

const Home = () => {

  return (
   <div style={{ height: '100vh', width: '100%' }}>
     <NextSeo  title="World" />
                <Map />
    </div>
  )
}

export default Home
