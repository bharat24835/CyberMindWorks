import jobModel from "../models/jobModel.js";


export const createJobController = async(req , res)=>{
    try {

        const {title , company , location  , jobType ,experience , minSalary , maxSalary , deadline , description  } = req.body;

        if(!title){
            return res.status(400).send({status :'Error' , message : "title is required"})
        }
        if(!company){
            return res.status(400).send({status :'Error' ,message : "company is required"})
        }
        if(!location){
            return res.status(400).send({status :'Error' ,message : "location is required"})
        }
        if(!jobType){
            return res.status(400).send({status :'Error' ,message : "jobType is required"})
        }
        if(!experience){
            return res.status(400).send({status :'Error' ,message : "experience is required"})
        }
        if(!minSalary){
            return res.status(400).send({status :'Error' ,message : "minSalary is required"})
        }
        if(!maxSalary){
            return res.status(400).send({status :'Error' ,message : "maxSalary is required"})
        }
       
        if(!description && description.length == 0){
            return res.send({message : "Description is required"})
        }
       let companyLogo = `https://logo.clearbit.com/${company.trim()}.com`;

        const job = await new jobModel({ companyLogo, title , company ,location , jobType , experience , minSalary , maxSalary , deadline ,description  }).save();
        return res.status(201).send({ status :'Success' , message :"Job Created Successfully"  , data : job });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send( { status :'Error' , message : "Error while creating Job (Try and Catch)"  , error})
        
    }
}

export const getAllJobController = async(req , res)=>{
    try {

        const jobs = await jobModel.find();
        return res.status(200).send({ status :'Success' , message : "Retrieving All Jobs Successfully " , length :jobs.length ,  data : jobs} );

        
    } catch (error) {
        console.log(error);
        return res.send(500).send({status :'Error', message : "Error while getting all Job Posted " , error})
        
    }
}

export const getAllTitles = async(req , res)=>{
    try {

        const titles = await jobModel.distinct("title");
        return res.status(200).send({status :'Success' , message : "Getting All title successful" , length : titles.length ,  data : titles})
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status : "Error" , message : "Error in retrieving All Unique job title" , error})
        
    }
}
export const getAllLocations = async(req , res)=>{
    try {

        const locations = await jobModel.distinct("location");
        return res.status(200).send({status :'Success' , message : "Getting All title successful" , length : locations.length ,  data : locations})
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status : "Error" , message : "Error in retrieving All Unique job title" , error})
        
    }
}

export const filterJobs = async (req, res) => {
    try {
      const { titles, locations, jobTypes  ,  minSalary, maxSalary} = req.body;
  
      // Construct the filter object based on provided criteria
      const filter = {};
      if (titles && titles.length > 0) {
        filter.title = { $in: titles }; // Match any title in the array
      }
      if (locations && locations.length > 0) {
        filter.location = { $in: locations }; // Match any location in the array
      }
      if (jobTypes && jobTypes.length > 0) {
        filter.jobType = { $in: jobTypes }; // Match any jobType in the array
      }
      // Handle minSalary and maxSalary
    if (minSalary || maxSalary) {
        
        if (minSalary || maxSalary) {
            filter.$or = [
              { minSalary: { $lte: maxSalary || 100000, $gte: minSalary || 0 } }, // Overlaps min
              { maxSalary: { $lte: maxSalary || 100000, $gte: minSalary || 0 } }, // Overlaps max
              {
                $and: [
                  { minSalary: { $lte: minSalary || 0 } },
                  { maxSalary: { $gte: maxSalary || 100000 } }, // Contains range
                ],
              },
            ];
          }
      }
  
      // Query the database with the constructed filter
      const jobs = await jobModel.find(filter);
  
      return res.status(200).send({
        status: "Success",
        length : jobs.length ,
        message: "Jobs retrieved successfully based on filters",
        data: jobs,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: "An error occurred while filtering jobs",
        error: error.message,
      });
    }
  };
  