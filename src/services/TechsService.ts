import { HttpError } from "../errors/HttpError";
import { CreateTechsAttributes, ITechsRepositorie } from "../repositories/TechsRepositorie";

export class TechsService {
    constructor( readonly techsRepositorie: ITechsRepositorie ){}

    async findAllTechs (){
        const findAll = await this.techsRepositorie.findAll();
        return findAll
    }

    async create (attributes: CreateTechsAttributes){
        const newTech = await this.techsRepositorie.create(attributes);
        return newTech
    }

    async techExists(id: number){
        const tech = await this.techsRepositorie.findById(id);
        if(!tech) throw new HttpError(404, "Tech não encontrada!");
    }

    async update( id:number, attributes: Partial<CreateTechsAttributes> ){
        await this.techExists(id);

        const updatedTech = await this.techsRepositorie.update(id, attributes);
        return updatedTech
    }

    async delete(id: number) {
        await this.techExists(id);
        await this.techsRepositorie.delete(id);
    }
}