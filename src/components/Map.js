import React from 'react'
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
const center = { lat: 48.8584, lng:2.2945   }
const Map = ({ direction }) => {

  return (
    <div className='relative  xl:h-[511px] xl:w-[560px] lg:w-[40%] md:h-[400px]  w-[100%]  h-[357px] box-shadow '>
      <div className='absolute h-[100%] w-[100%] '>
        <GoogleMap mapContainerStyle={{ width: '100%', height: '100%' }} center={center} zoom={15}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false
          }}
        >
          {direction && <DirectionsRenderer directions={direction} />}
        </GoogleMap>
      </div>
    </div>
  )
}

export default Map
