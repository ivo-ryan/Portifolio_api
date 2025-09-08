import { ProjetRequestSchema, UpdateProjectRequestSchema } from "./schema/ProjectRequestSchema";
export class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
        this.index = async (req, res, next) => {
            try {
                const projects = await this.projectService.projectsAll();
                res.status(200).json(projects);
            }
            catch (error) {
                next(error);
            }
        };
        this.create = async (req, res, next) => {
            try {
                const body = ProjetRequestSchema.parse(req.body);
                const newProject = await this.projectService.createProject(body);
                res.status(201).json(newProject);
            }
            catch (error) {
                next(error);
            }
        };
        this.update = async (req, res, next) => {
            try {
                const body = UpdateProjectRequestSchema.parse(req.body);
                const id = +req.params.id;
                const updatedProject = await this.projectService.updateProject(body, id);
                res.json(updatedProject);
            }
            catch (error) {
                next(error);
            }
        };
        this.delete = async (req, res, next) => {
            try {
                const id = +req.params.id;
                const deletedProject = await this.projectService.projectDelete(id);
                res.json(deletedProject);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
