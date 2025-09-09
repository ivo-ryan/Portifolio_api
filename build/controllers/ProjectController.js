"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const ProjectRequestSchema_1 = require("./schema/ProjectRequestSchema");
class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield this.projectService.projectsAll();
                res.status(200).json(projects);
            }
            catch (error) {
                next(error);
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = ProjectRequestSchema_1.ProjetRequestSchema.parse(req.body);
                const newProject = yield this.projectService.createProject(body);
                res.status(201).json(newProject);
            }
            catch (error) {
                next(error);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = ProjectRequestSchema_1.UpdateProjectRequestSchema.parse(req.body);
                const id = +req.params.id;
                const updatedProject = yield this.projectService.updateProject(body, id);
                res.json(updatedProject);
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = +req.params.id;
                const deletedProject = yield this.projectService.projectDelete(id);
                res.json(deletedProject);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ProjectController = ProjectController;
