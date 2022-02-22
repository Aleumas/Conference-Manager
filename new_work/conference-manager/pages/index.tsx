import type { NextPage } from 'next';
import Background from '../components/Background';
import Auth from '../components/Auth';

const Home: NextPage = () => {
  return (
    <div>
      <Background type='image' image='/hero.jpg' color='#4C82F8'> 
        <Auth/>
      </Background>
    </div>
 )
}

export default Home
