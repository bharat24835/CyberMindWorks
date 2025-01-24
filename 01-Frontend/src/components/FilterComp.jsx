import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Autocomplete, TextField, InputAdornment, Stack, Typography } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Slider from '@mui/material/Slider';
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import axios from "axios";
const FilterComp = ({jobs , setJobs}) => {
  const [jobTitle, setJobTitle] = useState([]);
  const [preferredLocation, setPreferredLocation] = useState([]);
  const [jobType, setJobType] = useState([]);
  const [payRange, setPayRange] = useState([0 , 100]);

  const [givenJobTitle , setGivenJobTitles] = useState([]); 
  const [givenLocation , setGivenLocation] = useState([]); 

  // console.log(jobTitle);
  

  
  const givenJobType = ["Part Time", "Full Time", "Contract" , "Internship"];
  
  const givenSalaryRange =  [0 , 100]


  const fetchJobTitle = async()=>{
    try {

      const res = await axios.get("https://cybermindworks-backend-project.onrender.com/api/v1/job/allTitles");
      if(res.data.status === 'Success'){
        setGivenJobTitles(res.data.data);
        // console.log(res.data.data);
        
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }
  const fetchAllLocations = async()=>{
    try {

      const res = await axios.get("https://cybermindworks-backend-project.onrender.com/api/v1/job/allLocations");
      if(res.data.status === 'Success'){
        setGivenLocation(res.data.data);
        // console.log(res.data.data);
        
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }



useEffect(()=>{
  fetchJobTitle();
  fetchAllLocations();

} , [jobs])

useEffect(()=>{
  const fetchFilterJobs = async()=>{
    try {
      console.log(`Job Title` , jobTitle);
      console.log(`Job Type` , jobType);
      console.log(`Locations` , preferredLocation);
      console.log(`minSalary` , payRange[0]);
      console.log(`maxSalary` , payRange[1]);
      
      const res = await axios.post("https://cybermindworks-backend-project.onrender.com/api/v1/job/filterJobs" , {
        titles : jobTitle  ,
        locations : preferredLocation ,
        jobTypes  : jobType,
        minSalary : payRange[0],
        maxSalary : payRange[1] 
      });
      console.log("WE are in filtering function");
      
      if(res.data.status === 'Success'){
        // console.log(res.data.data);
        
               setJobs(res.data.data);
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  const getData = setTimeout(()=>{
    fetchFilterJobs();
  } , 100);

  return ()=>clearTimeout(getData);
} , [jobTitle , preferredLocation , jobType , payRange])

  const handleChange1 = (event, newValue) => {
    setJobTitle(newValue);
    // console.log("Selected:", newValue);
  };
  const handleChange2 = (event, newValue) => {
    setPreferredLocation(newValue);
    // console.log("Selected:", newValue);
  };
  const handleChange3 = (event, newValue) => {
    setJobType(newValue);
    // console.log("Selected:", newValue);
  };
  const handleChange4 = (event, newValue) => {
    setPayRange(newValue);
    // console.log("Selected:", newValue);
  };



  return (
    <div>
      <AppBar
        color="white"
        elevation={1}
        sx={{
          height: "85px",
          width: "100%",
          justifyContent: "center",
          position: "fixed",
          top: "70px",
          marginTop: "0px",
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }}
        
      >
        <Toolbar >
          <Box display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        padding: " 0 5px",
        border: "0px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#fff",
        gap: "5px",
        marginTop:"0px"
      }}>
          <Box display="flex" alignItems="center" sx={{  paddingRight: "5px" }}>
            <SearchOutlinedIcon sx={{marginTop:'8px' , marginRight:'10px', color : "gray"}}/>
          
          <Autocomplete
          popupIcon={<KeyboardArrowDownOutlinedIcon />} 
            sx={{ width: "280px" , paddingRight :'5px' , borderRight :'2px groove ' }}
            options={givenJobTitle}
            multiple
            limitTags={1}
            onChange={handleChange1}
             size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Search By Job Title"
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true, 
                  
                }}
                
                sx={{
                  "& .MuiInputBase-root": {
                    border: "none",
                  },
                  "& .MuiInput-underline:before": {
                    borderBottom: "none", 
                  },
                  "& .MuiInput-underline:after": {
                    borderBottom: "none", 
                  },
                  "& .MuiInput-root": {
                    borderBottom: "none",
                  },
                }}
              />
            )}
            ListboxProps={{
              style: {
                maxHeight: "200px", // Restricts the dropdown height
                overflowY: "auto", // Enables scrolling for dropdown
              },
            }}
          />
          </Box>
          <Box display="flex" alignItems="center" sx={{  paddingRight: "5px" }}>
            <LocationOnOutlinedIcon sx={{marginTop:'8px' , marginRight:'10px', color : "gray"}}/>
          
         
          
          <Autocomplete
            popupIcon={<KeyboardArrowDownOutlinedIcon />}
            sx={{ width: "300px" , padding : '0px 10px' ,  borderRight :'2px groove' }}
            options={givenLocation}
            multiple
            limitTags={1}
            onChange={handleChange2}
             size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Preferred Location"
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true, // Removes the underline
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    border: "none", // Removes the outer border
                  },
                  "& .MuiInput-underline:before": {
                    borderBottom: "none", // Removes the underline (before focus)
                  },
                  "& .MuiInput-underline:after": {
                    borderBottom: "none", // Removes the underline (after focus)
                  },
                  "& .MuiInput-root": {
                    borderBottom: "none", // Ensures no underline anywhere
                  },
                }}
              />
            )}
          />
          </Box>
          <Box display="flex" alignItems="center" sx={{  paddingRight: "5px" }}>
            <RecordVoiceOverOutlinedIcon sx={{marginTop:'8px' , marginRight:'10px', color : "gray"}}/>
            <Autocomplete
            popupIcon={<KeyboardArrowDownOutlinedIcon />}
            sx={{ width: "300px" , padding : '0px 10px' ,  borderRight :'2px groove' }}
            options={givenJobType}
            multiple
            limitTags={1}
            onChange={handleChange3}
             size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label=" Job Type"
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true, 
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    border: "none", 
                  },
                  "& .MuiInput-underline:before": {
                    borderBottom: "none",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottom: "none", 
                  },
                  "& .MuiInput-root": {
                    borderBottom: "none", 
                  },
                }}
              />
            )}
          />
       
          </Box>
          

<Stack>
  <Stack direction={'row'} justifyContent={"space-between"} padding={"0px 20px"}>
    <Typography variant="body2" sx={{fontSize:'14px', fontWeight:'550'}}>Salary per Month</Typography>
    <Typography variant="body2">₹{payRange[0]}k - ₹{payRange[1]}k</Typography>
  </Stack>
        <Slider
        getAriaLabel={() => 'Minimum distance shift'}
        value={payRange}
        onChange={handleChange4}
        disableSwap
        
        sx={{ width: "340px" , margin : '0px 20px' ,"& .MuiSlider-thumb": {
      backgroundColor: "transparent",
      border: "10.0px solid black", 
      padding:'0px 0px',
      margin:'0px 0px',
      width: 20, 
      height: 20,
    },
    "& .MuiSlider-rail": {
      backgroundColor: "gray",
      height: 2 , 
      padding:'0px 2px'
    },
    "& .MuiSlider-track": {
      backgroundColor: "black", 
      height: 3,
      border :'1px solid black',
      margin:'0px 0px',
      
       
    }, }}
      />
</Stack>
</Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default FilterComp;
