import { TechsRequestSchema, UpdateTechsRequestSchema } from "./schema/TechsRequestSchema";
export class TechsController {
    constructor(techsService) {
        this.techsService = techsService;
        this.index = async (req, res, next) => {
            try {
                const techs = await this.techsService.findAllTechs();
                res.json(techs);
            }
            catch (error) {
                next(error);
            }
        };
        this.create = async (req, res, next) => {
            try {
                const body = TechsRequestSchema.parse(req.body);
                const newTech = await this.techsService.create(body);
                res.status(201).json(newTech);
            }
            catch (error) {
                next(error);
            }
        };
        this.update = async (req, res, next) => {
            try {
                const body = UpdateTechsRequestSchema.parse(req.body);
                const id = +req.params.id;
                const updatedTech = await this.techsService.update(id, body);
                res.json(updatedTech);
            }
            catch (error) {
                next(error);
            }
        };
        this.delete = async (req, res, next) => {
            try {
                const id = +req.params.id;
                const deletedTech = await this.techsService.delete(id);
                res.json(deletedTech);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
