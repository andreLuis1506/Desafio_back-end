import { Router } from 'express';
import { getConnection, getRepository } from 'typeorm';
import Tool from '../models/Tool';

import User from '../models/User';

const UserRouter = Router();

UserRouter.post('/', async (request, response) =>{
    try{
        const { name, email, password, tools } = request.body;
        const user = new User();

        user.name = name;
        user.email = email; 
        user.password = password;
        user.tools = tools;

        const repoUser = getRepository(User);
        const res = await repoUser.save(user);

        response.status(201).json(res);
    } catch (err){
        response.status(400).json(err);
    }
}); 

UserRouter.post('/addtool', async (request, response) => {
    
    try{
        const token = request.headers['x-access-token'];
        const { toolId } = request.body
        
        if(!token){
            return response.status(500).json({ auth:false, message: 'No token provided.'})
        }
        
        const repoUser = getRepository(User);

        const res = await getConnection().createQueryBuilder().insert().into('users_tools__tools').values({userId: token, toolsId: toolId}).execute();

        response.status(200).json(res);

    } catch (err){
        response.status(400).json(err)
    }
});

export default UserRouter;
