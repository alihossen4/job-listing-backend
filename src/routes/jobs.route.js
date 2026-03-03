import express from 'express'
const router = express.Router();
import apiRoutes from '../controllers/controller.js';

router.use(apiRoutes);
export {router}