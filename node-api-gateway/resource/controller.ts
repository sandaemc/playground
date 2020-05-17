import * as express from "express";
import { CreateResourceDTO, UpdateResourceDTO } from "./dtos";
import { add, findAll, findOne, update } from "./repository";
import { Resource } from "./resource";

export async function createResource(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const dto: CreateResourceDTO = req.body;

    const result = await add(new Resource(dto.name, dto.host));

    return res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function getResource(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const result = await findOne(req.params.name);
    return res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateResource(
  { body, params: { name } }: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const dto: UpdateResourceDTO = body;
    const resource = await findOne(name);
    resource.host = dto.host;

    const result = await update(resource);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function getResources(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    return res.json(await findAll());
  } catch (error) {
    next(error);
  }
}
