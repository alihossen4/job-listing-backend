// import express from "express"
// import bodyParser from "body-parser"
const cors = require('cors')

import serverless from "serverless-http";
const router = require("./src/routes/jobs.route.js")
const {JobData} = require("./src/data/index.js")
const express = require("express")
const app = express();

app.use(express.json);
app.use(cors({
  origin:"http://localhost:3000" || "*",
  methods:["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.get("/", (req, res) => {
  res.send("Jobs Api");
});

app.use("/jobs", router, (req, res)=>{
    res.json(JobData);
});

app.use('/filter',router,(req, res)=>{
  const data = JobData.filter((job)=>{job})
  res.json(data);
})
export default serverless(app);

// app.listen(3000,()=>{
//   console.log("server is running at 3000");
// })