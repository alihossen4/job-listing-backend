const express = require("express")
const apiRoutes = express.Router();
// import JobData from "../data/index.js";
// import JobData from "../data/index.js";

let JobData = require("../data/index.js");
// let JobData;
const updateData = async() => {
  try {
    delete require.cache[require.resolve("../data/index.js")]
    JobData = require("../data/index.js")
    console.log("Data updated at: ", new Date());
  } catch (error) {
    console.error("Error updating data:", error);
  }
};


updateData(); 
const interval = setInterval(updateData, 4 * 60 * 1000);

apiRoutes.get("/", (req, res) => {
  const jobs = JobData.jobs;
  const limit = req.query._limit;

  if (limit && !isNaN(limit)) {
    const limitedJobs = jobs.slice(0, parseInt(limit));
    res.send(limitedJobs);
  } else {
    res.send(jobs);
  }
});


apiRoutes.get("/:id", (req, res) => {
  const jobId = req.params.id;
  const job = JobData.jobs.find((job) => job.id === jobId);
  if (job) {
    res.send(job);
  } else {
    res
      .status(404)
      .send({ success: false, msg: "No job found with the provided ID." });
  }
});

apiRoutes.get('/filter',(req, res)=>{
  const {title } = req.query;
  if(!title){
    res.status(400).json({error:"Title is ruquired"})
  }
  const filteredJobs= JobData.jobs.filter((job)=> job.title.replace(" ","").toLowerCase().includes(title.toLowerCase()));
  res.json(filteredJobs);
})
apiRoutes.post("/", (req, res) => {
  const newJob = req.body;
  const newJobId = Math.floor(100000 + Math.random() * 900000).toString();
  newJob.id = newJobId;

  JobData.jobs.push(newJob);
  res.send({ success: true, msg: "Job Created Successfully!", job: newJob });
});


apiRoutes.put("/:id", (req, res) => {
  const jobId = req.params.id;
  const index = JobData.jobs.findIndex((job) => job.id === jobId);
  if (index !== -1) {
    const updatedJob = { ...req.body, id: jobId };
    JobData.jobs[index] = updatedJob;
    res.send({
      success: true,
      msg: `Job with id ${jobId} has been updated`,
      job: updatedJob,
    });
  } else {
    res.status(404).send({ success: false, msg: "Job not found!" });
  }
});


apiRoutes.delete("/:id", (req, res) => {
  const jobId = req.params.id;
  const index = JobData.jobs.findIndex((job) => job.id === jobId);
  if (index !== -1) {
    const deletedJob = JobData.jobs.splice(index, 1)[0];
    res.send({
      success: true,
      msg: `Job with id ${jobId} has been deleted`,
      job: deletedJob,
    });
  } else {
    res.status(404).send({ success: false, msg: "Job not found!" });
  }
});
module.exports = apiRoutes;
// export default apiRoutes