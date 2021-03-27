import { Router } from 'express';
import ToolRouter from './Tools.router';

const routes = Router();

routes.use('/tool', ToolRouter);

export default routes;
