import React , {useState} from 'react'
import axios from 'axios'
import toast  from 'react-hot-toast';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    InputAdornment,
  } from "@mui/material";

const CreateJob = ({ fetchAllJobs,  open, onClose }) => {
    const [formData, setFormData] = useState({
        jobTitle: "",
        companyName: "",
        location: "",
        jobType: "",
        experience : "",
        salaryRangeMin: "",
        salaryRangeMax: "",
        applicationDeadline: "",
        jobDescription: "",
      });
      
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
      const handlePublish = async () => {
       try {

         const desc = formData.jobDescription.split("\n");

        const res = await axios.post("https://cybermindworks-backend-project.onrender.com/api/v1/job/createJob" , {title : formData.jobTitle , company : formData.companyName , location : formData.location , jobType : formData.jobType , experience : formData.experience , minSalary : parseInt(formData.salaryRangeMin) , maxSalary : parseInt(formData.salaryRangeMax) , description : desc });
        
       
        // console.log(res.data);
        if(res.data.status === 'Success'){
          onClose();
          fetchAllJobs()
          setFormData({
            jobTitle: "",
            companyName: "",
            location: "",
            jobType: "",
            experience : "",
            salaryRangeMin: "",
            salaryRangeMax: "",
            applicationDeadline: "",
            jobDescription: "",
          })
          toast.success("Job Created Successfully")
        }
        

        console.log("Job Created");
        
        
       } catch (error) {
        console.log("Error while Creating Job");
        
       }
       
      };
    
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>Create Job Opening</DialogTitle>
    <DialogContent>
      <TextField
        fullWidth
        margin="dense"
        label="Job Title"
        name="jobTitle"
        value={formData.jobTitle}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="dense"
        label="Company Name"
        name="companyName"
        value={formData.companyName}
        onChange={handleChange}
        placeholder="e.g., Amazon, Microsoft, Swiggy"
      />
      <TextField
        fullWidth
        margin="dense"
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Choose Preferred Location"
      />
      <TextField
        fullWidth
        margin="dense"
        select
        label="Job Type"
        name="jobType"
        value={formData.jobType}
        onChange={handleChange}
      >
        <MenuItem value="Part Time">Part Time</MenuItem>
        <MenuItem value="Full Time">Full Time</MenuItem>
        <MenuItem value="Contract">Contract</MenuItem>
        <MenuItem value="Internship">Internship</MenuItem>
      </TextField>
      <TextField
        fullWidth
        margin="dense"
        label="Experience (e.g 1-3)"
        name="experience"
        value={formData.experience}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="dense"
        label="Salary Range"
        name="salaryRangeMin"
        value={formData.salaryRangeMin}
        helperText={
          formData.salaryRangeMin > 100 ? "Value cannot be greater than 100" : ""
        }
        onChange={handleChange}
        type="number"
        InputProps={{
          startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          placeholder: "Min Salary (in thousand)",
        }}
      />
      <TextField
        fullWidth
        margin="dense"
        name="salaryRangeMax"
        value={formData.salaryRangeMax}
        helperText={
          formData.salaryRangeMax > 100 ? "Value cannot be greater than 100" : ""
        }
        onChange={handleChange}
        type="number"
        InputProps={{
          startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          placeholder: "Max Salary (in thousand)",
        }}
      />
      <TextField
        fullWidth
        margin="dense"
        label="Application Deadline"
        name="applicationDeadline"
        type="date"
        value={formData.applicationDeadline}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        fullWidth
        margin="dense"
        label="Job Description"
        name="jobDescription"
        value={formData.jobDescription}
        onChange={handleChange}
        placeholder="Please share a description to let the candidate know more about the job role"
        multiline
        rows={4}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Save Draft</Button>
      <Button variant="contained" color="primary" onClick={handlePublish}>
        Publish
      </Button>
    </DialogActions>
  </Dialog>
  )
}

export default CreateJob
