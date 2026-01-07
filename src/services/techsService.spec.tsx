import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateTechsAttributes, ITechsRepository } from "../repositories/TechsRepository";
import { TechsService } from "./TechsService";

const techsRepositorieMock:ITechsRepository = {
    findAll: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
};

const techFake:CreateTechsAttributes = {
    name: "JavaScript",
    description: "Linguagem de programação JavaScript",
    imgUrl: "https://example.com/js.png",
}

describe("Techs Service", () => {
    const service = new TechsService(techsRepositorieMock);

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Deve retornar todas as techs", async () => {
        (techsRepositorieMock.findAll as any).mockResolvedValueOnce([
            { id: 1, name: "JavaScript" },
            { id: 2, name: "TypeScript" },
        ]);

        const result = await service.findAllTechs();

        expect(techsRepositorieMock.findAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual([
            { id: 1, name: "JavaScript" },
            { id: 2, name: "TypeScript" },
        ]);

    });

    it("Deve criar uma nova tech", async () => {
        (techsRepositorieMock.create as any).mockResolvedValueOnce({
            id: 3,
            ...techFake
        });
        const result = await service.create(techFake);

        expect(techsRepositorieMock.create).toHaveBeenCalledTimes(1);
        expect(techsRepositorieMock.create).toHaveBeenCalledWith(techFake);
        expect(result).toEqual({
            id: 3,
            ...techFake
        });
    });

    it("Não deve laçar erro se a tech existir", async () => {
        (techsRepositorieMock.findById as any).mockResolvedValueOnce({id:1, ...techFake});
        await expect(service.techExists(1)).resolves.not.toThrow();
        expect(techsRepositorieMock.findById).toHaveBeenCalledTimes(1);
        expect(techsRepositorieMock.findById).toHaveBeenCalledWith(1);
    });

    it("Deve atualizar uma tech existente", async () => {
            (techsRepositorieMock.findById as any).mockResolvedValueOnce({id:1, ...techFake});
            (techsRepositorieMock.update as any).mockResolvedValueOnce({
                id: 1,
                name: "JavaScript Updated",
                description: "Updated description",
                imgUrl: "https://example.com/js-updated.png",
            });

            const result = await service.update(1, {
                name: "JavaScript Updated",
                description: "Updated description",
                imgUrl: "https://example.com/js-updated.png",
            });
            expect(techsRepositorieMock.findById).toHaveBeenCalledTimes(1);
            expect(techsRepositorieMock.update).toHaveBeenCalledTimes(1);
            expect(techsRepositorieMock.update).toHaveBeenCalledWith(1, { name: "JavaScript Updated", description: "Updated description", imgUrl: "https://example.com/js-updated.png" });
            expect(result).toEqual({
                id: 1,
                name: "JavaScript Updated",
                description: "Updated description",
                imgUrl: "https://example.com/js-updated.png",
            });
        });

        it("Deve mostrar mensagem de erro ao atualizar tech inexistente", async () => {
            (techsRepositorieMock.findById as any).mockResolvedValueOnce(null);

            await expect(service.update(99, { name: "Non-existent Tech" })).rejects.toThrow("Tech não encontrada!");
            expect(techsRepositorieMock.findById).toHaveBeenCalledTimes(1);
            expect(techsRepositorieMock.findById).toHaveBeenCalledWith(99);
            expect(techsRepositorieMock.update).not.toHaveBeenCalled();
        });

        it("Deve mostrar mensagem de erro quando ID da tech não existir", async () => {
            (techsRepositorieMock.findById as any).mockResolvedValueOnce(null);
            await expect(service.techExists(99)).rejects.toThrow("Tech não encontrada!");
            expect(techsRepositorieMock.findById).toHaveBeenCalledTimes(1);
            expect(techsRepositorieMock.findById).toHaveBeenCalledWith(99);        
        });

        it("Deve deletar uma tech existente", async () => {
            (techsRepositorieMock.findById as any).mockResolvedValueOnce({id:1, ...techFake});
            (techsRepositorieMock.delete as any).mockResolvedValueOnce({id:1, ...techFake});

            const result = await service.delete(1);

            expect(techsRepositorieMock.findById).toHaveBeenCalledTimes(1);
            expect(techsRepositorieMock.findById).toHaveBeenCalledWith(1);
            expect(techsRepositorieMock.delete).toHaveBeenCalledTimes(1);
            expect(techsRepositorieMock.delete).toHaveBeenCalledWith(1);
            expect(result).toEqual({
                id:1, ...techFake
            })
        });

        it("Deve mostrar mensagem de erro ao deletar tech inexistente", async () => {
            (techsRepositorieMock.findById as any).mockResolvedValueOnce(null);
            await expect(service.delete(99)).rejects.toThrow("Tech não encontrada!");
            expect(techsRepositorieMock.findById).toHaveBeenCalledTimes(1);
            expect(techsRepositorieMock.findById).toHaveBeenCalledWith(99);
            expect(techsRepositorieMock.delete).not.toHaveBeenCalled();
        });
});