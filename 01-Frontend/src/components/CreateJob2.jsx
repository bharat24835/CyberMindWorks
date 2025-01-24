import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  Grid,
  Typography,
} from "@mui/material";

const CreateJob2 = ({ fetchAllJobs, open, onClose }) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    jobType: "",
    experience: "1-3",
    salaryRangeMin: "",
    salaryRangeMax: "",
    applicationDeadline: "",
    jobDescription: "",
  });
  const jobTypes = ["FullTime", "PartTime", "Contract"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handlePublish = async () => {
    try {
      //  const desc = formData.jobDescription.split("\n");
      const desc2 = formData.jobDescription
        .split("\n")
        .filter((ele, i, arr) => {
          if (ele.trim().length > 0) return true;
          return false;
        });

        console.log(formData);
        

      const res = await axios.post(
        "https://cybermindworks-backend-project.onrender.com/api/v1/job/createJob",
        {
          title: formData.jobTitle,
          company: formData.companyName,
          location: formData.location,
          jobType: formData.jobType,
          experience: formData.experience,
          minSalary: parseInt(formData.salaryRangeMin)/1000,
          maxSalary: parseInt(formData.salaryRangeMax)/1000,
          description: desc2,
        }
      );

      console.log(res.data);
      if (res.data.status === "Success") {
        onClose();
        fetchAllJobs();
        setFormData({
          jobTitle: "",
          companyName: "",
          location: "",
          jobType: "",
          experience: "1-5",
          salaryRangeMin: "",
          salaryRangeMax: "",
          applicationDeadline: "",
          jobDescription: "",
        });
        toast.success("Job Created Successfully");
      }

      console.log("Job Created");
    } catch (error) {
      console.log("Error while Creating Job" , error);
    }
  };
  return (
    //  <Dialog open={open} onClose={onClose}    >
    //     <DialogTitle>Create Job Opening</DialogTitle>
    //     <DialogContent>
    //       <TextField

    //         margin="dense"
    //         placeholder='Software Engineer , ...'
    //         name="jobTitle"
    //         value={formData.jobTitle}
    //         onChange={handleChange}
    //       />
    //       <TextField

    //         margin="dense"
    //         name="companyName"
    //         value={formData.companyName}
    //         onChange={handleChange}
    //         placeholder="e.g., Amazon, Microsoft, Swiggy"
    //       />
    //       <TextField

    //         margin="dense"
    //         name="location"
    //         value={formData.location}
    //         onChange={handleChange}
    //         placeholder="Choose Preferred Location"
    //       />
    //       <TextField
    //         sx={{width:"100px"}}
    //         margin="dense"
    //         select
    //         placeholder='Full Time'
    //         name="jobType"
    //         value={formData.jobType}
    //         onChange={handleChange}
    //       >
    //         <MenuItem value="Part Time">Part Time</MenuItem>
    //         <MenuItem value="Full Time">Full Time</MenuItem>
    //         <MenuItem value="Contract">Contract</MenuItem>
    //         <MenuItem value="Internship">Internship</MenuItem>
    //       </TextField>
    //       <TextField

    //         margin="dense"
    //         label="Experience (e.g 1-3)"
    //         name="experience"
    //         value={formData.experience}
    //         onChange={handleChange}
    //       />
    //       <TextField

    //         margin="dense"
    //         label="Salary Range"
    //         name="salaryRangeMin"
    //         value={formData.salaryRangeMin}
    //         helperText={
    //           formData.salaryRangeMin > 100 ? "Value cannot be greater than 100" : ""
    //         }
    //         onChange={handleChange}
    //         type="number"
    //         InputProps={{
    //           startAdornment: <InputAdornment position="start">₹</InputAdornment>,
    //           placeholder: "Min Salary (in thousand)",
    //         }}
    //       />
    //       <TextField

    //         margin="dense"
    //         name="salaryRangeMax"
    //         value={formData.salaryRangeMax}
    //         helperText={
    //           formData.salaryRangeMax > 100 ? "Value cannot be greater than 100" : ""
    //         }
    //         onChange={handleChange}
    //         type="number"
    //         InputProps={{
    //           startAdornment: <InputAdornment position="start">₹</InputAdornment>,
    //           placeholder: "Max Salary (in thousand)",
    //         }}
    //       />
    //       <TextField

    //         margin="dense"
    //         label="Application Deadline"
    //         name="applicationDeadline"
    //         type="date"
    //         value={formData.applicationDeadline}
    //         onChange={handleChange}
    //         InputLabelProps={{ shrink: true }}
    //       />
    //       <TextField

    //         margin="dense"
    //         label="Job Description"
    //         name="jobDescription"
    //         value={formData.jobDescription}
    //         onChange={handleChange}
    //         placeholder="Please share a description to let the candidate know more about the job role"
    //         multiline
    //         rows={4}
    //       />
    //     </DialogContent>
    //     <DialogActions>
    //       <Button onClick={onClose}>Save Draft</Button>
    //       <Button variant="contained" color="primary" onClick={handlePublish}>
    //         Publish
    //       </Button>
    //     </DialogActions>
    //   </Dialog>

    <Dialog open={open} onClose={onClose} fullWidth sx={{ minWidth: "500px" }}>
      <DialogTitle>Create Job Opening</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography
              sx={{ fontWeight: 600 ,
                color: "gray", // Default color
                "&.focused": {
                  color: "black", // Color when focused
                },
              }}
      
            >
              Job Title
            </Typography>
            <TextField
          
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  borderColor: "gray", // Default border color
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black", // Border color when focused
                  },
                },
              }}
              onFocus={(e) =>
                e.target.closest(".MuiOutlinedInput-root")?.classList.add("Mui-focused")
              }
              name="jobTitle"
              placeholder="React Developer ..."
              fullWidth
              value={formData.jobTitle}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography  sx={{ fontWeight: 600 ,
                color: "gray", // Default color
                "&.focused": {
                  color: "black", // Color when focused
                },
              }} >Company Name</Typography>
            <TextField
            placeholder="Amazon , Swiggy .. "
              name="companyName"
              fullWidth
              value={formData.companyName}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  borderColor: "gray", // Default border color
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black", // Border color when focused
                  },
                },
              }}
              onFocus={(e) =>
                e.target.closest(".MuiOutlinedInput-root")?.classList.add("Mui-focused")
              }
            />
          </Grid>
          <Grid item xs={6}>
          <Typography  sx={{ fontWeight: 600 ,
                color: "gray", // Default color
                "&.focused": {
                  color: "black", // Color when focused
                },
              }} >Location
              </Typography>
            <TextField
              placeholder="Enter Preferred Location"
              name="location"
              fullWidth
              value={formData.location}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  borderColor: "gray", // Default border color
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black", // Border color when focused
                  },
                },
              }}
              onFocus={(e) =>
                e.target.closest(".MuiOutlinedInput-root")?.classList.add("Mui-focused")
              }
            />
          </Grid>
          <Grid item xs={6}>
          <Typography  sx={{ fontWeight: 600 ,
                color: "gray", // Default color
                "&.focused": {
                  color: "black", // Color when focused
                },
              }} >Job Type
              </Typography>
            <TextField
              fullWidth
              select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              popupIcon={<KeyboardArrowDownOutlinedIcon />}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  borderColor: "gray", // Default border color
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black", // Border color when focused
                  },
                },
              }}
              onFocus={(e) =>
                e.target.closest(".MuiOutlinedInput-root")?.classList.add("Mui-focused")
              }
            >
              <MenuItem value="Part Time">Part Time</MenuItem>
                     <MenuItem value="Full Time">Full Time</MenuItem>
                     <MenuItem value="Contract">Contract</MenuItem>
                     <MenuItem value="Internship">Internship</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={3}>
          <Typography
              sx={{ fontWeight: 600 ,
                color: "gray", // Default color
                "&.focused": {
                  color: "black", // Color when focused
                },
              }}
              id="job-title-label"
            >
              Salary Range 
            </Typography>
            
            <TextField
              placeholder="Min Salary"
              name="salaryRangeMin"
              type="number"
              
              fullWidth
              value={formData.salaryRangeMin}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  borderColor: "gray", // Default border color
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black", // Border color when focused
                  },
                },
              }}
              onFocus={(e) =>
                e.target.closest(".MuiOutlinedInput-root")?.classList.add("Mui-focused")
              }
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              placeholder="Max Salary"
              name="salaryRangeMax"
              type="number"
              fullWidth
              value={formData.salaryRangeMax}
              onChange={handleChange}
              sx={{
                marginTop:'22px',
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  borderColor: "gray", // Default border color
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black", // Border color when focused
                  },
                },
              }}
              onFocus={(e) =>
                e.target.closest(".MuiOutlinedInput-root")?.classList.add("Mui-focused")
              }
            />
          </Grid>
          <Grid item xs={6}>
          <Typography
              sx={{ fontWeight: 600 ,
                color: "gray", // Default color
                "&.focused": {
                  color: "black", // Color when focused
                },
              }}
              id="job-title-label"
            >
              Application Deadline
            </Typography>
            <TextField
              name="applicationDeadline"
              type="date"
              fullWidth

              value={formData.applicationDeadline}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  borderColor: "gray", // Default border color
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black", // Border color when focused
                  },
                },
              }}
              onFocus={(e) =>
                e.target.closest(".MuiOutlinedInput-root")?.classList.add("Mui-focused")
              }
            />
          </Grid>
          <Grid item xs={12}>
          <Typography
              sx={{ fontWeight: 600 ,
                color: "gray", // Default color
                "&.focused": {
                  color: "black", // Color when focused
                },
              }}
              id="job-title-label"
            >
              Job Description
            </Typography>
            <TextField
              name="jobDescription"
              placeholder="Please share the Description to let the candidate know more about the job role"
              fullWidth
              multiline
              rows={4}
              value={formData.jobDescription}
              onChange={handleChange}
              sx={{
                
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  borderColor: "gray", // Default border color
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black", // Border color when focused
                  },
                },
              }}
              onFocus={(e) =>
                e.target.closest(".MuiOutlinedInput-root")?.classList.add("Mui-focused")
              }
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end" spacing={2} marginTop={2}>
          <Grid item>
            <Button variant="outlined" onClick={onClose} color="secondary">
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handlePublish}>
              Publish
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default CreateJob2;
