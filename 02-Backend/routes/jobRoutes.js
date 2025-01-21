import express from 'express'
import { createJobController, filterJobs, getAllJobController, getAllLocations, getAllTitles } from '../controllers/jobController.js';


// router object
const router  = express.Router()

router.post('/createJob' , createJobController)
router.get("/allJobs" , getAllJobController)
router.get("/allTitles" , getAllTitles)
router.get("/allLocations" , getAllLocations)
router.post("/filterJobs" , filterJobs)




export default router;