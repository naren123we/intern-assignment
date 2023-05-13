import React, { useRef, useState } from 'react'
import { Autocomplete } from '@react-google-maps/api';

import OriginIcon from '../assets/Ellipse1.png'
import StoppageIcon from '../assets/Ellipse2.png'
import DestinationIcon from '../assets/Destination Icon.png';
import Addalta from '../assets/Add-alt.png'


const Select = ({ set, distance }) => {
  const autocompleteRef = useRef(null);
  const originref = useRef()
  const destinationref = useRef()
  const inputArr = [{
    id: 1,
    value: ""
  }]

  const [mode, setmode] = useState('DRIVING')
  const [arr, setArr] = useState(inputArr)
  const [waypts, setwaypts] = useState([]);

  

  const handlePlaceChanged = () => {
    setwaypts(s => {
      return [...s, {
        location: autocompleteRef.current.getPlace().name,
        stopover: true
      }
      ]
    })

  };


  const addInput = () => {
    setArr(s => {
      return [...s, {
        value: ''
      }]
    })
  }


  async function calculateroute() {

    if (originref.current.value === '' || destinationref.current.value === '')
      return


    //eslint-disable-next-line
    const directionservice = new google.maps.DirectionsService()
    try {
      const results = (waypts.length !== 0) ? await directionservice.route({
        origin: originref.current.value,
        destination: destinationref.current.value,
        //eslint-disable-next-line
        travelMode: google.maps.TravelMode[mode],
        waypoints: waypts,
        optimizeWaypoints: true,
      }) : await directionservice.route({
        origin: originref.current.value,
        destination: destinationref.current.value,
        //eslint-disable-next-line
        travelMode: google.maps.TravelMode[mode],
      })

      let val = 0;
      for (let i = 0; i < results.routes[0].legs.length; i++) {
        val = val + results.routes[0].legs[i].distance.value
      }
      set(results, (val / 1000))

    } catch (err) {
      alert(err)
    }

  }

 return (
    <div className='mt-[22px] lg:mt-0'>
      <div
        className='flex flex-row justify-between items-center lg:space-x-[99px]'>
        <div className='flex flex-col md:space-y-[26px] space-y-[23px]'>


          <div className='relative  font-plexSans'>
            <label className='hidden md:block   text-[14px] font-normal  py-1 text-[#000000] ' >Origin</label>
            <Autocomplete  >
              <input
                ref={originref}
                type="text"
                placeholder='Enter  origin'
                className='border focus:outline-none  border-[#DCDDEC] rounded-[6px] py-2 px-10 text-[16px] font-[600] text-[#1E2A32] md:w-[250px] xs:w-[350px] w-[300px] h-[45px]  '
              />
            </Autocomplete>

            <img
              src={OriginIcon}
              alt='originicon'
              className={`absolute md:top-[43px] top-[15px] left-[17px] border-black border-2  rounded-full `}
            />

          </div>

          <div>

            <div className='relative  font-plexSans'>

              <label className='hidden md:block   text-[14px] font-normal  pt-1 -mb-1 text-[#000000] ' >Stop</label>
              {arr.map((item, i) => {
                return (
                  <div className='relative pt-2 ' key={i}>
                    <Autocomplete onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                      onPlaceChanged={handlePlaceChanged} >

                      <input
                        type="text"
                        id={i}
                        className='border focus:outline-none  border-[#DCDDEC] rounded-[6px] py-2 px-10 text-[16px] font-[600] text-[#1E2A32] md:w-[250px] xs:w-[350px] w-[300px] h-[45px]  '
                      />
                    </Autocomplete>
                    <img src={StoppageIcon} alt='stoppageicon' className='absolute  top-[25px] left-[17px]  rounded-full ' />
                  </div>
                )
              })}

            </div>

            <div className='flex justify-end space-x-2 md:py-2 py-2 items-center px-3'>
              <img
                onClick={addInput}
                src={Addalta}
                alt='addalta'
                className="md:w-[18px] md:h-[18px] cursor-pointer  w-[16px] h-[16px] "
              />

              <span className='md:text-[15px] text-[12px] text-[#2E2E2E] font-rubik'>Add another stop</span>
            </div>

          </div>


        </div>

        <button
          onClick={calculateroute}
          className='bg-[#1B31A8] hidden md:block w-[141px] h-[62px] mt-[35px] rounded-[32px] font-plexSans font-semibold text-lg text-[#FFFFFF]'
        >Calculate
        </button>


      </div>

      <div className='mt-[27px] '>

        <div className='flex flex-col md:space-y-[26px] space-y-[23px]'>

          <div className='relative  font-plexSans'>
            <label className='hidden md:block   text-[14px] font-normal  py-1 text-[#000000] ' >Destination</label>
            <Autocomplete >
              <input
                ref={destinationref}
                type="text"
                placeholder='Enter desitation'
                className='border focus:outline-none  border-[#DCDDEC] rounded-[6px] py-2 px-10 text-[16px] font-[600] text-[#1E2A32] md:w-[250px] xs:w-[350px] w-[300px] h-[45px]  '
              />
            </Autocomplete>

            <img
              src={DestinationIcon}
              alt='destitationicon'
              className={`absolute md:top-[43px] top-[15px] left-[17px]  rounded-full `} />
          </div>

          <div className='relative  font-plexSans'>
            <label className='hidden md:block   text-[14px] font-normal  py-1 text-[#000000] ' >Transit Mode</label>
            <div className='border bg-[#ffff] border-[#DCDDEC] rounded-[6px] px-4 md:w-[250px] xs:w-[350px] w-[300px] h-[45px] ' >
              <select id="mode" className='bg-[#ffff] focus:outline-none text-[16px] font-[600] text-[#1E2A32] w-[100%] h-[100%]  rounded-[6px] cursor-pointer ' onChange={(e) => {
                setmode(e.target.value)
              }}>
                <option value="DRIVING">Driving</option>
                <option value="WALKING">Walking</option>
                <option value="TRANSIT">Transit</option>
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={calculateroute}
          className='bg-[#1B31A8] focus:outline-none md:hidden block w-[141px] h-[40px] mx-auto my-[23px] rounded-[32px] font-plexSans font-semibold text-lg text-[#FFFFFF]'
        >Calculate</button>


        <div className='md:w-[490px] md:min-h-[158px] xs:w-[350px] w-[300px] min-h-[155px]  md:mt-[43px] rounded-[8px] border border-[#E9EEF2]'>

          <div className='bg-[#FFFFFF]  h-[78px] md:px-[26px] px-[30px] flex flex-row justify-between items-center'>
            <span className='font-[700] font-plexSans md:text-[20px] text-lg text-[#1E2A32]'>Distance</span>
            <span className='font-[700] font-plexSans md:text-3xl text-[22px] text-[#0079FF]'>{distance !== '' ? `${distance} kms` : '__'}</span>
          </div>

          {distance !== '' && <p className='py-[22px] md:px-[26px]   px-[30px] font-WorkSans   text-[12px] text-[#1E2A32] '>The distance between <b>{originref.current.value}</b> and <b>{destinationref.current.value}</b> via the seleted route is <b>{distance}</b> kms.</p>}
        </div>
      </div>
    </div>
  )
}

export default Select
