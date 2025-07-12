import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BlurredText from './components/blur';
function hello(){
  return(
  < >
  <div className ="home">
  <div className="Home-page-nav"> 
    <div className="Title"><p className="title1"> <BlurredText text="Welcome to Skill Swap Platform" speed={75} delay={500} /></p></div>
    <div className='Login'><a href="#"><button className='btn-login'>Login</button></a></div>
  </div>
  <div className='info'>
    <div className='info-1 info-2'>
      <div className='profile-pic'>
      </div>
      <div className='information'>
      <div className='Name'>Marc De Blanco</div>
      <div className="skills">
      <div className='skills-offered'>Skills Offered:</div>
      <div className='skills-requested'>Skills Requested:</div>
      </div>
      </div>
      <div className="request" >
        <button className="btn-request">Request</button>
      </div>
    </div>
    <div className='info-1'>
      <div className='profile-pic'>
      </div>
      <div className='information'>
      <div className='Name'>Marc De Blanco</div>
      <div className="skills">
      <div className='skills-offered'>Skills Offered:</div>
      <div className='skills-requested'>Skills Requested:</div>
      </div>
      </div>
      <div className="request" >
        <button className="btn-request">Request</button>
      </div>
    </div>
    <div className='info-1'>
     <div className='profile-pic'>
      </div>
      <div className='information'>
      <div className='Name decrypt-text'>Marc De Blanco</div>
      <div className="skills">
      <div className='skills-offered'>Skills Offered:</div>
      <div className='skills-requested'>Skills Requested:</div>
      </div>
      </div>
      <div className="request">
        <button className="btn-request">Request</button>
      </div>
    </div>
  </div>
  </div>
  </>);
}

export default hello;