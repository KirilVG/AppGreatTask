
import express from 'express';
import { apiRouter } from './api-routes.js';
import pictureRoutes from './pictureRoutes.js';

export const routes = express.Router();

routes.use('/api', apiRouter);
routes.use('/api', pictureRoutes);