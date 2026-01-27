import { beforeEach, describe, expect, it, vi } from "vitest";
import { TechsPrisma } from "./TechsPrisma";
import { prisma } from "../../database";

vi.mock("../../database", () => ({
    prisma:{
        techs: {
            findMany: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            findUnique: vi.fn(),
        }
    }
}));

describe("Techs Prisma Repository", () => {
    const prismaTechs = new TechsPrisma();
    beforeEach(() => { 
        vi.clearAllMocks();
    });

    it("Deve chamar o método findAll do prisma", async () => {
        await prismaTechs.findAll();
        expect(prisma.techs.findMany).toHaveBeenCalled();
        expect(prisma.techs.findMany).toHaveBeenCalledTimes(1);
    });

    it("Deve chamar o método create do prisma com os atributos corretos", async () => {
        const attributesFake = { 
            name: "Tech Teste", 
            description: "Descrição da tech teste", 
            imgUrl: "https:exemple.com/image.png" 
        };
        await prismaTechs.create(attributesFake);
        expect(prisma.techs.create).toHaveBeenCalledWith({ data: attributesFake });
        expect(prisma.techs.create).toHaveBeenCalledTimes(1);
    });

    it("Deve chamar o método update do prisma com os parâmetros corretos", async () => {
        const id = 1;
        const updateAttributes = { name: "Tech Atualizada" };
        await prismaTechs.update(id, updateAttributes);
        expect(prisma.techs.update).toHaveBeenCalledWith({
            where: { id },
            data: updateAttributes
        });
        expect(prisma.techs.update).toHaveBeenCalledTimes(1);
    });

    it("Deve chamar o método delete do prisma com o id correto", async () => {      
        const id = 1;
        await prismaTechs.delete(id);
        expect(prisma.techs.delete).toHaveBeenCalledWith({ where: { id } });
        expect(prisma.techs.delete).toHaveBeenCalledTimes(1);    
    });

    it("Deve chamar o método findunique do prisma com o id correto", async () => {
        const id = 1;
        await prismaTechs.findById(id);
        expect(prisma.techs.findUnique).toHaveBeenCalledWith({ where: { id } });
        expect(prisma.techs.findUnique).toHaveBeenCalledTimes(1);
    });

});