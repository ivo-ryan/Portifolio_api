import { HttpError } from "../errors/HttpError";
export class TechsService {
    constructor(techsRepositorie) {
        this.techsRepositorie = techsRepositorie;
    }
    async findAllTechs() {
        const findAll = await this.techsRepositorie.findAll();
        return findAll;
    }
    async create(attributes) {
        const newTech = await this.techsRepositorie.create(attributes);
        return newTech;
    }
    async techExists(id) {
        const tech = await this.techsRepositorie.findById(id);
        if (!tech)
            new HttpError(404, "Tech não encontrada!");
    }
    async update(id, attributes) {
        await this.techExists(id);
        const updatedTech = await this.techsRepositorie.update(id, attributes);
        return updatedTech;
    }
    async delete(id) {
        await this.techExists(id);
        const deletedTech = await this.techsRepositorie.delete(id);
    }
}
