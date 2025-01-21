import React from 'react'
import { Grid, Container } from "@mui/material";
import CardComp2 from './CardComp2';

const DisplayJobComp = ({jobs}) => {
  return (
    <Container xs ="4" 
    maxWidth={false} // Ensures the container spans the full width
      disableGutters // Removes default padding from the container
      sx={{ top: '190px'  , width : '100vw' ,px: '10px', mx: 0 , 
        height: 'calc(100vh - 190px)', // Full screen height minus the top margin
        overflow: 'auto', // Make the container scrollable
        position: 'relative', // Ensure proper positioning
        zIndex: 1, // Prevent overlap issues with other components
     }}>
    <Grid container spacing={5} >
      {jobs.map((job, index) => (
        <Grid item xs = {12} sm={6}  md ={4} lg={3}   key={index}>
          <CardComp2 job={job} />
        </Grid>
      ))}
    </Grid>
  </Container>
  )
}

export default DisplayJobComp
