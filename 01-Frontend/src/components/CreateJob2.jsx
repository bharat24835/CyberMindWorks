import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

import {
  Box , 
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
   
    <Box>
    <Dialog open={open} onClose={onClose} fullWidth  
    sx={{
      
      minWidth: "700px", 
      "& .MuiPaper-root": {
        borderRadius: "20px", 
      },
    }}>
      <DialogTitle  variant="h5" sx={{
      display: "flex",
      justifyContent: "center",
      textAlign: "center", 
      fontWeight: 600, 
    }}>Create Job Opening</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography
              sx={{ fontWeight: 600 ,
                color: "gray",
                "&.focused": {
                  color: "black", 
                },
              }}
      
            >
              Job Title
            </Typography>
            <TextField
          
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  borderColor: "gray", 
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black", 
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
                color: "gray", 
                "&.focused": {
                  color: "black", 
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
                  borderColor: "gray",
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black", 
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
                color: "gray", 
                "&.focused": {
                  color: "black", 
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
                  borderColor: "gray", 
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black", 
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
                color: "gray", 
                "&.focused": {
                  color: "black", 
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
                color: "gray",
                "&.focused": {
                  color: "black", 
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
                  borderColor: "gray", 
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black" , 
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
                  borderColor: "gray", 
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
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
                color: "gray", 
                "&.focused": {
                  color: "black", 
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
                  borderColor: "gray", 
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
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
                color: "gray", 
                "&.focused": {
                  color: "black", 
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
                  borderColor: "gray", 
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black", 
                  },
                },
              }}
              onFocus={(e) =>
                e.target.closest(".MuiOutlinedInput-root")?.classList.add("Mui-focused")
              }
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between" spacing={2} marginTop={2}>
          <Grid item>
            <Button variant="outlined" onClick={onClose} color="secondary"  endIcon={<KeyboardDoubleArrowDownIcon/>}
            sx={{
              borderColor: "black", 
              color: "black", 
              width: "150px", 
              fontSize: "12px", 
              height:'45px',
              borderRadius: "10px", 
              "&:hover": {
                borderColor: "black", 
                backgroundColor: "rgba(0, 0, 0, 0.08)",
              },
            }}
            >
              Save Draft
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handlePublish}
            sx={{
              fontSize: "12px",  
              width: "150px", 
              borderRadius: "12px", 
              height:'45px'
            }}>
              Publish
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
    </Box>
  );
};

export default CreateJob2;
