import { Router } from 'express';
import { getRepository } from 'typeorm';

import Tool from '../models/Tool';

const ToolRouter = Router();

ToolRouter.post('/', async (request, response) => {
  try {
    const { title, link, description, tags } = request.body;
    const tool = new Tool();

    tool.title = title;
    tool.link = link;
    tool.description = description;
    tool.tags = tags;

    const repoTool = getRepository(Tool);
    const res = await repoTool.save(tool);

    response.status(201).json(res);
  } catch (err) {
    response.status(400).json(err);
  }
});

ToolRouter.get('/', async (request, response) => {
  try {
    const repoTool = getRepository(Tool);
    const res = await repoTool.find();

    response.status(200).json(res);
  } catch (err) {
    response.status(400).json(err);
  }
});

ToolRouter.delete('/:id', async (request, response) => {
  try {
    const repoTool = getRepository(Tool);
    const { id } = request.params;
    const res = await repoTool.delete(id);

    response.status(200).json(res);
  } catch (err) {
    response.status(400).json(err);
  }
});

export default ToolRouter;
