import { Handler } from "express";
import { TechsRequestSchema, UpdateTechsRequestSchema } from "./schema/TechsRequestSchema";
import { TechsService } from "../services/TechsService";

export class TechsController {

    constructor( readonly techsService: TechsService ){}

    index: Handler = async (req , res, next) => {
        try {
            const techs = await this.techsService.findAllTechs();
            res.json(techs);
        } catch (error) {
            next(error)
        }
    }

    create: Handler = async (req , res, next) => {
        try {
            const body = TechsRequestSchema.parse(req.body);
            const newTech = await this.techsService.create(body);
            res.status(201).json(newTech);
        } catch (error) {
            next(error)
        }
    }

    update: Handler = async (req , res, next) => {
        try {
            const body = UpdateTechsRequestSchema.parse(req.body);
            const id = +req.params.id;
            const updatedTech = await this.techsService.update(id, body);
            res.json(updatedTech);
            
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req , res, next) => {
        try {
            const id = +req.params.id;
            const deletedTech = await this.techsService.delete(id);
            res.json(deletedTech);
        } catch (error) {
            next(error)
        }
    }
}