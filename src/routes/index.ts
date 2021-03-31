import { Router } from 'express';
import ToolRouter from './Tools.router';
import UserRouter from './User.router';

const routes = Router();

routes.use('/tool', ToolRouter);
routes.use('/user', UserRouter);

export default routes;
