import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'

import serverless from "serverless-http";
import {router} from "./src/routes/jobs.route.js"
import JobData from "./src/data/index.js"
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());


app.get("/", (req, res) => {
  res.send("Jobs Api");
});

app.use("/jobs", router, (req, res)=>{
    res.json(JobData);
});

app.use('/filter',router,(req, res)=>{
  const data = JobData.filter((job)=>{job})
})
// export default serverless(app);

app.listen(3000,()=>{
  console.log("server is running at 3000");
})