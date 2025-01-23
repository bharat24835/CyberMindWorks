import React from 'react'
import { 
    Card, 
    CardContent, 
    Typography, 
    Button, 
    Box, 
    List, 
    ListItem,
    ListItemText,
    Stack,
    Avatar
  } from '@mui/material';
  import { Work, LocationOn, AttachMoney } from '@mui/icons-material';
  import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
  import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
  import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const CardComp2 = ({  job}) => {

  const getTimeBeforeCreated = (createdAt) => {
    const createdDate = new Date(createdAt); 
    const now = new Date();   
    const timeDifference = now - createdDate; 
    const hoursDifference = timeDifference / (1000 * 60 * 60); 
  
    if (hoursDifference > 24) {
      const daysDifference = Math.floor(hoursDifference / 24); 
      return `${daysDifference} days ago`;
    } else {
      return `${Math.floor(hoursDifference)} hrs ago`;
    }
  };

  const postedTime = getTimeBeforeCreated(job.createdAt);
  return (
    <div >
    <Card sx={{ maxWidth: 316, minHeight : '300px', borderRadius: 3, overflow: 'hidden' , maxHeight :'360px' }}>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', flexDirection :"column" ,  alignItems: 'flex-start', gap: 2 }}>
        <Stack direction={'row'}  
  justifyContent="space-between" sx={{width :'100%'}}  >
        <Avatar
          src={job.companyLogo}
          alt="Company Logo"
          sx={{ width: 64, height: 64, borderRadius: 2 }}
        />
         <Typography variant="body2" color=""  sx={{ backgroundColor: '#B0D9FF',height : "30px" , padding : '4px 5px ' , borderRadius: "10px" }}>
          {postedTime}
        </Typography>
        </Stack>
        
        
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
            {job.title}
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="center"
    justifyContent="space-around" // Ensures equal spacing across the entire width
    sx={{ width: "100%" }} >
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
              <PersonAddAltOutlinedIcon sx={{ fontSize: 20, mr: 0.5 }} />
              <Typography variant="body2">{job.experience} yr Exp</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
              <CorporateFareOutlinedIcon sx={{ fontSize: 20, mr: 0.2  }} />
              <Typography variant="body2">{job.location}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
              <CurrencyRupeeIcon sx={{ fontSize: 20, mr: 0.1 }} />
              <Typography variant="body2">{job.maxSalary}K</Typography>
            </Box>
          </Stack>
        </Box>
       
      </Box>

      <Box minHeight={'100px'}>
      <List sx={{ mt: 1 }}>
  {job.description.map((item, index) => (
    <ListItem key={index} sx={{ py: 0.5 , px : 0.7 }}>
      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
        • {item}
      </Typography>
    </ListItem>
  ))}
</List>
</Box>

      <Button
        variant="contained"
        href={job.applyLink}
        fullWidth
        sx={{
          mt: 3,
          py: 1.5,
          borderRadius: 2,
          textTransform: 'none',
          fontSize: '1rem'
        }}
      >
        Apply Now
      </Button>
    </CardContent>
  </Card>
  </div>
  )
}

export default CardComp2
