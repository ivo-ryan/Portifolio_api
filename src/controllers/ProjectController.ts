import { Handler } from "express";
import { ProjectService } from "../services/ProjectService";
import { ProjectRequestSchema, UpdateProjectRequestSchema } from "./schema/ProjectRequestSchema";

export class ProjectController {

    constructor(readonly projectService: ProjectService){}

    index: Handler = async (req , res , next ) => {
        try {
            const projects = await this.projectService.projectsAll();
            res.status(200).json(projects);
            
        } catch (error) {
            next(error)
        }
    }

    create: Handler = async (req , res , next ) => {
        try {
            const body = ProjectRequestSchema.parse(req.body);
            const newProject = await this.projectService.createProject(body);
            res.status(201).json(newProject);
            
        } catch (error) {
            next(error)
        }
    }

    update: Handler = async (req , res , next ) => {
        try {
            const body = UpdateProjectRequestSchema.parse(req.body);
            const id = +req.params.id;
            const updatedProject = await this.projectService.updateProject(body, id);
            res.json(updatedProject);
            
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req , res , next ) => {
        try {
            const id = +req.params.id;
            const deletedProject = await this.projectService.projectDelete(id);
            res.json(deletedProject);
            
        } catch (error) {
            next(error)
        }
    }
}