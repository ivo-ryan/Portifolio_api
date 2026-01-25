import { describe, expect, it, vi } from "vitest";
import { TechsService } from "../services/TechsService";
import { TechsController } from "./TechsController";

const techsServiceMock = {
    findAllTechs: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
}as unknown as TechsService;

const techFake = {
    name: "Nova Tecnologia",
    description: "Descrição da nova tecnologia",
    imgUrl: "https://example.com/tech.png"

};


describe("TechsController", () => { 

    const controller = new TechsController(techsServiceMock);

    it("Deve listar todas as tecnologias", async () => {
        const req: any = {};
        const res: any = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };
        const next = vi.fn();

        techsServiceMock.findAllTechs = vi.fn().mockResolvedValueOnce([
            { id: 1, name: "Tech 1" },
            { id: 2, name: "Tech 2" }
        ]);

        await controller.index(req, res, next);

        expect(res.json).toHaveBeenCalledWith([
            { id: 1, name: "Tech 1" },
            { id: 2, name: "Tech 2" }
        ]);
        expect(techsServiceMock.findAllTechs).toHaveBeenCalledTimes(1);
        expect(next).not.toHaveBeenCalled();

    });

    it("Deve chamar next em caso de erro na listagem de tecnologias", async () => {
        const req: any = {};
        const res: any = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };
        const next = vi.fn();

        const error = new Error("Erro ao listar tecnologias");
        techsServiceMock.findAllTechs = vi.fn().mockRejectedValueOnce(error);
        await controller.index(req, res, next);
        expect(next).toHaveBeenCalledWith(error);
        expect(techsServiceMock.findAllTechs).toHaveBeenCalledTimes(1);
    });

    it("Deve criar uma nova tecnologia com status 201", async () => {
        const req: any = {
            body: techFake
        };
        const res: any = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        const next = vi.fn();
        techsServiceMock.create = vi.fn().mockResolvedValueOnce({
            id: 3,
            ...techFake
        });

        await controller.create(req, res, next);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            id: 3,
            ...techFake
        });
        expect(techsServiceMock.create).toHaveBeenCalledTimes(1);
        expect(next).not.toHaveBeenCalled();

    });

   it("Deve atualizadar uma tecnologia existente", async () => {
        const req: any = {
            params: { id: "1" },
            body: { description: "Descrição atualizada" }
        };
        const res: any = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };
        const next = vi.fn();

        techsServiceMock.update = vi.fn().mockResolvedValueOnce({
            id: 1,
            name: "Nova Tecnologia",
            description: "Descrição atualizada",
            imgUrl: "https://example.com/tech.png"
        });

        await controller.update(req, res, next);
        expect(res.json).toHaveBeenCalledWith({
            id: 1,
            name: "Nova Tecnologia",
            description: "Descrição atualizada",
            imgUrl: "https://example.com/tech.png"
        });
        expect(techsServiceMock.update).toHaveBeenCalledTimes(1);
        expect(techsServiceMock.update).toHaveBeenCalledWith(1, { description: "Descrição atualizada" });
        expect(next).not.toHaveBeenCalled();

    });

    it("Deve deletar uma tecnologia existente", async () => {
        const req: any = {
            params: { id: "1" }
        };
        const res: any = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        const next = vi.fn();

        techsServiceMock.delete = vi.fn().mockResolvedValueOnce({
            id: 1,
            name: "Nova Tecnologia",
            description: "Descrição da nova tecnologia",
            imgUrl: "https://example.com/tech.png"
        });

        await controller.delete(req, res, next);

        expect(res.json).toHaveBeenCalledWith({
            id: 1,
            name: "Nova Tecnologia",
            description: "Descrição da nova tecnologia",
            imgUrl: "https://example.com/tech.png"
        });
        expect(techsServiceMock.delete).toHaveBeenCalledTimes(1);
        expect(techsServiceMock.delete).toHaveBeenCalledWith(1);
        expect(next).not.toHaveBeenCalled();
    });
});