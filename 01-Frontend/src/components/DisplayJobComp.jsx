import React from 'react'
import { Grid, Container } from "@mui/material";
import CardComp2 from './CardComp2';

const DisplayJobComp = ({jobs}) => {
  return (
    <Container xs ="4" 
    maxWidth={false} 
      disableGutters 
      sx={{ top: '190px'  , width : '100vw' ,px: '10px', mx: 0 , 
        height: 'calc(100vh - 190px)', 
        overflow: 'auto',
        position: 'relative', 
        zIndex: 1, 
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
