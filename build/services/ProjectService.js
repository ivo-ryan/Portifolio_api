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
exports.ProjectService = void 0;
const HttpError_1 = require("../errors/HttpError");
class ProjectService {
    constructor(projectRepositorie) {
        this.projectRepositorie = projectRepositorie;
    }
    projectsAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield this.projectRepositorie.findAll();
            return projects;
        });
    }
    createProject(attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProject = yield this.projectRepositorie.create(attributes);
            return newProject;
        });
    }
    projectIdExists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectId = yield this.projectRepositorie.findById(id);
            if (!projectId)
                new HttpError_1.HttpError(404, "O Projeto não foi encontrado!");
        });
    }
    updateProject(attributes, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.projectIdExists(id);
            const updatedProject = yield this.projectRepositorie.update(id, attributes);
            return updatedProject;
        });
    }
    projectDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.projectIdExists(id);
            const deletedProject = yield this.projectRepositorie.delete(id);
            return deletedProject;
        });
    }
}
exports.ProjectService = ProjectService;
