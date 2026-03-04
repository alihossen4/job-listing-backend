// import express from 'express'
const express = require("express")
const router = express.Router();
const apiRoutes = require('../controllers/controller.js');

router.use(apiRoutes);
module.exports = router
// export default router