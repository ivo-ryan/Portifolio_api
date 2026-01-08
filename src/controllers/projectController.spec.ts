import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProjectService } from "../services/ProjectService";
import { ProjectController } from "./ProjectController";


const projectServiceMock = {
    projectsAll: vi.fn(),
    createProject: vi.fn(),
    updateProject: vi.fn(),
    projectDelete: vi.fn()
} as unknown as ProjectService;

const projectFake = {
    name: "Projeto X",
    description: "Descrição do Projeto X",
    imgUrl: "https://example.com/projeto-x.png",
    vercelUrl: "https://example.com/projeto-x",
    gitUrl: "https://example.com/projeto-x.git",
    technologies: "JavaScript, TypeScript"
} ;

describe("Project Controller", () => {
    const controller = new ProjectController(projectServiceMock);

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Deve retornar todos os projetos com status 200", async () => {
        const req: any = {};
        const res: any = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };
        const next = vi.fn();

        projectServiceMock.projectsAll = vi.fn().mockResolvedValueOnce([
            { id: 1, name: "Projeto A" },
            { id: 2, name: "Projeto B" },
        ]);

        await controller.index(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([
            {id:1, name: "Projeto A"},
            {id:2, name: "Projeto B"}
        ])
        expect(projectServiceMock.projectsAll).toHaveBeenCalledTimes(1);
        expect(next).not.toHaveBeenCalled();
    });

    it("Deve chamar next em caso de erro na listagem de projetos", async () => {
        const req: any = {};
        const res: any = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };
        const next = vi.fn();

        const error = new Error("Erro ao listar projetos");
        projectServiceMock.projectsAll = vi.fn().mockRejectedValueOnce(error);

        await controller.index(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
        expect(projectServiceMock.projectsAll).toHaveBeenCalledTimes(1);

    });

    it("Deve criar um novo projeto com status 201", async () => {
        const req: any = {
            body: projectFake
        };
        const res: any = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        const next = vi.fn();
        projectServiceMock.createProject = vi.fn().mockResolvedValueOnce({
            id: 3,
            ...projectFake
        });

        await controller.create(req, res, next);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            id: 3,
            ...projectFake
        });
        expect(projectServiceMock.createProject).toHaveBeenCalledTimes(1);
        expect(projectServiceMock.createProject).toHaveBeenCalledWith(projectFake);
        expect(next).not.toHaveBeenCalled();
    });


    it("Deve chamar next em caso de erro na criação do projeto", async () => {
        const req: any = {
            body: {}
        };
        const res: any = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };
        const next = vi.fn();

        await controller.create(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(projectServiceMock.createProject).not.toHaveBeenCalled();
    });

    it("Deve atualizar um projeto existente", async () => {
        const req: any = {
            body: { description: "Descrição atualizada do Projeto X" },
            params: { id: "1" }
        };
        const res: any = {
            json: vi.fn()
        };
        const next = vi.fn();

        projectServiceMock.updateProject = vi.fn().mockResolvedValueOnce({
            id: 1,
            ...projectFake,
            description: "Descrição atualizada do Projeto X"
        });
        await controller.update(req, res, next);

        expect(res.json).toHaveBeenCalledWith({
            id: 1,
            ...projectFake,
            description: "Descrição atualizada do Projeto X"
        });
        expect(projectServiceMock.updateProject).toHaveBeenCalledTimes(1);
        expect(projectServiceMock.updateProject).toHaveBeenCalledWith({ description: "Descrição atualizada do Projeto X" }, 1);
        expect(next).not.toHaveBeenCalled();
    });

    it("Deve deletar um projeto existente", async () => {
        const req: any = {
            params: { id: "1" }
        };
        const res: any = {
            json: vi.fn()
        };
        const next = vi.fn();

        projectServiceMock.projectDelete = vi.fn().mockResolvedValueOnce({ message: "Projeto deletado com sucesso" });
        await controller.delete(req, res, next);
        expect(res.json).toHaveBeenCalledWith({ message: "Projeto deletado com sucesso" });
        expect(projectServiceMock.projectDelete).toHaveBeenCalledTimes(1);
        expect(projectServiceMock.projectDelete).toHaveBeenCalledWith(1);
        expect(next).not.toHaveBeenCalled();
    });
});