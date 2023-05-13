import './App.css';
import Select from './components/Select';
import Navbar from './components/Navbar';
import Map from './components/Map';

import { useJsApiLoader} from '@react-google-maps/api';
import { useState } from 'react';

function App() {

  const {isLoaded}=useJsApiLoader({
    googleMapsApiKey:process.env.React_App_Google_Maps_API_Key,
    libraries:['places']
  })

 const [direction,setdirection]=useState(null)
 const [distance,setdistance]=useState('')

 function set(direction,distance){
  setdirection(direction)
  setdistance(distance)
 }



  if(!isLoaded){
    return null
  }
  return (
    <div>
    <Navbar/>

    <div className='bg-[#F4F8FA] lg:py-[32px] md:py-[20px] md:pb-[32px] pb-[6px]'>
       <h1 className='text-center  hidden md:block  text-[#1B31A8] font-normal text-xl font-WorkSans'>Let's calculate <b>distance</b> from Google maps</h1>
      

      <div className='flex lg:flex-row flex-col-reverse items-center lg:justify-center lg:py-[32px] md:py-[20px] md:pb-[32px] pb-[6px] lg:px-6  xl:space-x-[130px] lg:space-x-[90px]  '>
          <Select  set={set} distance={distance}/>
        <Map direction={direction} />
           </div>

           </div>
       
    </div>
  );
}

export default App;
