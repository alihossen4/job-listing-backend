import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
import path from 'path'
import {router} from "./src/routes/jobs.route.js"
import JobData from "./src/data/index.js"
const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());

// Serve favicon


// route
app.get("/", (req, res) => {
  res.send("Jobs Api");
});

app.use("/jobs", router, (req, res)=>{
    res.json(JobData);
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});