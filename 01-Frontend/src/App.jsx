import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import CardComp2 from './components/CardComp2'
import {Stack} from '@mui/material'
import FilterComp from './components/FilterComp'
import CreateJob from './components/CreateJob'
import axios from 'axios'
import DisplayJobComp from './components/DisplayJobComp'

function App() {

  const [jobs , setJobs] = useState([]);
  // console.log(jobs);
  

  

  const fetchAllJobs = async()=>{
    try {

      const res = await axios.get("http://localhost:3000/api/v1/job/allJobs" );

      // console.log(res.data);
      if(res.data.status === 'Success'){
        setJobs(res.data.data);
      }


      
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{

   fetchAllJobs();

  } , [])



  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
 

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Navbar handleOpenPopup = {handleOpenPopup} />
    <FilterComp jobs ={jobs} setJobs = {setJobs} />
    <CreateJob fetchAllJobs= {fetchAllJobs}  open={isPopupOpen} onClose={handleClosePopup} />
    {/* <CardComp2 {...jobData} /> */}
    <DisplayJobComp jobs= {jobs}/>

</div>
  )
}

export default App
