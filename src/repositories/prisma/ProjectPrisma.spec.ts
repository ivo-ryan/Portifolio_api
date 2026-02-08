import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProjectPrisma } from "./ProjectPrisma";
import { prisma } from "../../database";
import { ProjectAttributes } from "../ProjectRepository";

vi.mock("../../database", () => ({
    prisma:{
        project: {
            findMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            findUnique: vi.fn(),
        }
    }
}));

const attributesFake = { 
    name: "Projeto Teste", 
    description: "Descrição do projeto teste" ,
    features: "features teste",
    gitUrl: "https:exemple.com",
    vercelUrl: "https:exemple.com",
    imgUrl: "https:exemple.com/image.png",
    technologies: "Tech1, Tech2"
};

describe("Project Prisma Repository", () => {
    const prismaProject = new ProjectPrisma();

    beforeEach(() => { 
        vi.clearAllMocks();
    });

    it("Deve chamar o método findAll do prisma", async () => {
        await prismaProject.findAll();
        expect(prisma.project.findMany).toHaveBeenCalledTimes(1);
    });

    it("Deve chamar o método create do prisma com os atributos corretos", async () => {
        await prismaProject.create(attributesFake);
        expect(prisma.project.create).toHaveBeenCalledWith({ data: attributesFake });
        expect(prisma.project.create).toHaveBeenCalledTimes(1);
    });

    it("Deve chamar o método update do prisma com os parâmetros corretos", async () => {
        const id = 1;
        const updateAttributes: Partial<ProjectAttributes> = { name: "Projeto Atualizado" };
        await prismaProject.update(id, updateAttributes);
        expect(prisma.project.update).toHaveBeenCalledWith({
            where: { id },
            data: updateAttributes
        });
        expect(prisma.project.update).toHaveBeenCalledTimes(1);
    });

    it("Deve chamar o método delete do prisma com o id correto", async () => {
        const id = 1;
        await prismaProject.delete(id);
        expect(prisma.project.delete).toHaveBeenCalledWith({ where: { id } });
        expect(prisma.project.delete).toHaveBeenCalledTimes(1);
    });

    it("Deve chamar o método findUnique do prisma com o id correto", async () => {
        const id = 1;
        await prismaProject.findById(id);
        expect(prisma.project.findUnique).toHaveBeenCalledWith({ where: { id } });
        expect(prisma.project.findUnique).toHaveBeenCalledTimes(1);
    });
});