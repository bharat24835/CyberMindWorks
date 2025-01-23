import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Autocomplete, TextField, InputAdornment, Stack, Typography } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Slider from '@mui/material/Slider';
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

  // useEffect(()=>{
  //   console.log(jobTitle);
  //   console.log(jobType);
  //   console.log(preferredLocation);
  //   console.log(payRange);
    
    
  // } )

  return (
    <div>
      <AppBar
        color="white"
        sx={{
          height: "85px",
          width: "100%",
          justifyContent: "center",
          position: "fixed",
          top: "70px",
          marginTop: "0px",
        }}
        
      >
        <Toolbar >
          <Autocomplete
            sx={{ width: "320px" , paddingRight :'5px' , borderRight :'2px groove' }}
            options={givenJobTitle}
            multiple
            limitTags={1}
            onChange={handleChange1}
            //  size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Search By Job Title"
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
          <Autocomplete
            sx={{ width: "320px" , padding : '0px 10px' ,  borderRight :'2px groove' }}
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
          <Autocomplete
            sx={{ width: "320px" , padding : '0px 10px' ,  borderRight :'2px groove' }}
            options={givenJobType}
            multiple
            limitTags={1}
            onChange={handleChange3}
            //  size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label=" Job Type"
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

<Stack>
  <Stack direction={'row'} justifyContent={"space-between"} padding={"0px 20px"}>
    <Typography variant="body2">Salary per Month</Typography>
    <Typography variant="body2">₹{payRange[0]}k - ₹{payRange[1]}k</Typography>
  </Stack>
        <Slider
        getAriaLabel={() => 'Minimum distance shift'}
        value={payRange}
        onChange={handleChange4}
        // valueLabelDisplay="auto"
        disableSwap
        
        sx={{ width: "400px" , margin : '0px 20px' ,"& .MuiSlider-thumb": {
      backgroundColor: "black", // Changes the color of the slider dots (thumbs) to black
      width: 16, // Reduces the size of the thumb (optional)
      height: 16,
    },
    "& .MuiSlider-rail": {
      backgroundColor: "gray", // Changes the color of the inactive (rail) part of the slider line
      height: 2, // Reduces the thickness of the slider line
    },
    "& .MuiSlider-track": {
      backgroundColor: "black", // Changes the color of the active part of the slider line
      height: 3, // Reduces the thickness of the slider line
    }, }}
      />
</Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default FilterComp;
