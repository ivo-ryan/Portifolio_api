import { HttpError } from "../errors/HttpError";
export class ProjectService {
    constructor(projectRepositorie) {
        this.projectRepositorie = projectRepositorie;
    }
    async projectsAll() {
        const projects = await this.projectRepositorie.findAll();
        return projects;
    }
    async createProject(attributes) {
        const newProject = await this.projectRepositorie.create(attributes);
        return newProject;
    }
    async projectIdExists(id) {
        const projectId = await this.projectRepositorie.findById(id);
        if (!projectId)
            new HttpError(404, "O Projeto não foi encontrado!");
    }
    async updateProject(attributes, id) {
        await this.projectIdExists(id);
        const updatedProject = await this.projectRepositorie.update(id, attributes);
        return updatedProject;
    }
    async projectDelete(id) {
        await this.projectIdExists(id);
        const deletedProject = await this.projectRepositorie.delete(id);
        return deletedProject;
    }
}
