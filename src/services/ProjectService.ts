import { HttpError } from "../errors/HttpError";
import { IProjectRepositorie, ProjectAttributes } from "../repositories/ProjectRepositorie";

export class ProjectService {
    constructor( readonly projectRepositorie: IProjectRepositorie){}

    async projectsAll (){
        const projects = await this.projectRepositorie.findAll();
        return projects
    }

    async createProject(attributes: ProjectAttributes) {
        const newProject = await this.projectRepositorie.create(attributes);
        return newProject
    }

    async projectIdExists(id: number) {
        const projectId = await this.projectRepositorie.findById(id);
        if(!projectId) new HttpError(404, "O Projeto não foi encontrado!");
    }

    async updateProject(attributes: Partial<ProjectAttributes> , id:number){
        await this.projectIdExists(id);
        const updatedProject = await this.projectRepositorie.update(id, attributes);
        return updatedProject
    }

    async projectDelete(id:number ){
        await this.projectIdExists(id);
        const deletedProject = await this.projectRepositorie.delete(id);
        return deletedProject
    }

    
}