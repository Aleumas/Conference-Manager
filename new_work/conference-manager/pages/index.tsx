import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Background from '../components/Background.tsx'
import Auth from '../components/Auth.tsx'

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
