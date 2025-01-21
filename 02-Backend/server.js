import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import jobRoutes from './routes/jobRoutes.js'
import morgan  from 'morgan';


// config env
dotenv.config()


// DateBase Config
connectDB();


// rest object
const app = express();

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json())


// router
app.use('/api/v1/job' , jobRoutes);

app.listen(process.env.PORT , ()=>{
    console.log(`Server is Running at ${process.env.PORT} PORT `.bgCyan);
    
})