import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Allmess from '../../components/Allmess/Allmess'
import Loginsign from '../../components/Loginsign/Loginsign'

const Home = ({setShowmessdetail}) => {
  return (
    <div>
      <Header/>
      <Allmess setShowmessdetail = {setShowmessdetail}/>
      
    </div>
  )
}

export default Home
