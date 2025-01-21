import mongoose, { trusted } from "mongoose";


const JobSchema = new mongoose.Schema({
    companyLogo :{
        type : String , 
        default : "https://logo.clearbit.com/amazon.com"
    },
    title : {
        type : String , 
        required : true,
        trim : true
    },
    company  : {
        type :String,
        required : true,
        trim : true
    },
    location : {
        type : String,
        required  : true,
        trim : true
    },
    jobType :{
        type  : String,
        required : true
    },
    experience : {
        type : String,
        required : true
    },
    minSalary   : {
        type : Number,
        required : true,
        trim : true
    },
    maxSalary   : {
        type : Number,
        required : true,
        trim : true
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    deadline : {
        type : Date,
        default : Date.now()
    },
    description : {
        type : [String],
        required : true
    }
})

export default mongoose.model('jobs' , JobSchema);