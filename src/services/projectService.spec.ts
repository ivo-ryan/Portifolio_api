import { beforeEach, describe, expect, it, vi } from 'vitest'
import { IProjectRepository, ProjectAttributes } from '../repositories/ProjectRepository';
import { ProjectService } from './ProjectService';

const projectRepositorieMock:IProjectRepository = {
    findAll: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
}

const projectFake = [
    {
        id: 1,
        name: "Projeto Teste",
        description: "Descrição do projeto teste",
        link_github: "https://github.com/projeto-teste",
        link_demo: "https://projeto-teste.com",
        techs: [1,2]
    },

    {
        id: 2,
        name: "Projeto Exemplo",
        description: "Descrição do projeto exemplo",
        link_github: "https://github.com/projeto-exemplo",
        link_demo: "https://projeto-exemplo.com",
        techs: [3,4]
    }
];

const createProductFake: ProjectAttributes = {
    name: "Projeto Novo",
    description: "Descrição do projeto novo",
    gitUrl: "https://github.com/projeto-novo",
    vercelUrl: "https://projeto-novo.com",
    technologies: "js,ts,react",
    imgUrl: "exemplo.com/img.png",
    features: "exemplo de feature"
};

describe('Project Service', () => {
    const service = new ProjectService(projectRepositorieMock);

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('Deve retornar todos os projetos', async () => {
        (projectRepositorieMock.findAll as any).mockResolvedValueOnce(projectFake);
        const result = await service.projectsAll();

        expect(projectRepositorieMock.findAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual(projectFake);

    });

    it('Deve criar um novo projeto', async () => {
        (projectRepositorieMock.create as any).mockResolvedValueOnce({
            id: 3,
            ...createProductFake
        });

        const result = await service.createProject(createProductFake);

        expect(projectRepositorieMock.create).toHaveBeenCalledTimes(1)
        expect(projectRepositorieMock.create).toHaveBeenCalledWith(createProductFake);
        expect(result).toEqual({
            id: 3,
            ...createProductFake
        });
    });

    it("Deve verificar se projeto existe ao buscar por ID", async () => {
            (projectRepositorieMock.findById as any).mockResolvedValueOnce(projectFake[0]);
            
            await expect(service.projectIdExists(1)).resolves.not.toThrow();
            expect(projectRepositorieMock.findById).toHaveBeenCalledTimes(1);
            expect(projectRepositorieMock.findById).toHaveBeenCalledWith(1);
        });

    it("Deve lançar erro se projeto não existir ao buscar por ID", async () => {
            (projectRepositorieMock.findById as any).mockResolvedValueOnce(null);
            await expect(service.projectIdExists(99)).rejects.toThrow("O Projeto não foi encontrado!")
            expect(projectRepositorieMock.findById).toHaveBeenCalledTimes(1);
            expect(projectRepositorieMock.findById).toHaveBeenCalledWith(99);
    });

    it("Deve atualizar um projeto existente", async () => {
            (projectRepositorieMock.findById as any).mockResolvedValueOnce(projectFake[0]);
            (projectRepositorieMock.update as any).mockResolvedValueOnce({
                ...projectFake[0],
                name: "Projeto Atualizado"
            });
            
            const result = await service.updateProject({name: "Projeto Atualizado"}, 1);

            expect(result).toEqual({
                ...projectFake[0],
                name: "Projeto Atualizado"
            });
            expect(projectRepositorieMock.update).toHaveBeenCalledTimes(1);
            expect(projectRepositorieMock.update).toHaveBeenCalledWith(1, {name: "Projeto Atualizado"});
            expect(projectRepositorieMock.findById).toHaveBeenCalledTimes(1);
            expect(projectRepositorieMock.findById).toHaveBeenCalledWith(1);
        });

    it("Deve lançar erro ao tentar atualizar um projeto inexistente", async () => {
        (projectRepositorieMock.findById as any).mockResolvedValueOnce(null);

        await expect(service.updateProject({name: "Projeto Atualizado"}, 99)).rejects.toThrow("O Projeto não foi encontrado!");
        expect(projectRepositorieMock.findById).toHaveBeenCalledTimes(1);
        expect(projectRepositorieMock.findById).toHaveBeenCalledWith(99);
        expect(projectRepositorieMock.update).not.toHaveBeenCalled();
    });

    it("Deve deletar um projeto existente", async () => {
        (projectRepositorieMock.findById as any).mockResolvedValueOnce(projectFake[0]);
        (projectRepositorieMock.delete as any).mockResolvedValueOnce(true);
        const result = await service.projectDelete(1);
        expect(result).toBe(true);
        expect(projectRepositorieMock.findById).toHaveBeenCalledTimes(1);
        expect(projectRepositorieMock.findById).toHaveBeenCalledWith(1);
        expect(projectRepositorieMock.delete).toHaveBeenCalledTimes(1);
        expect(projectRepositorieMock.delete).toHaveBeenCalledWith(1);
    });

    it("Deve lançar erro ao tentar deletar um projeto inexistente", async () => {
        (projectRepositorieMock.findById as any).mockResolvedValueOnce(null);
        await expect(service.projectDelete(99)).rejects.toThrow("O Projeto não foi encontrado!");
        expect(projectRepositorieMock.findById).toHaveBeenCalledTimes(1);
        expect(projectRepositorieMock.findById).toHaveBeenCalledWith(99);
        expect(projectRepositorieMock.delete).not.toHaveBeenCalled();
    });
    
});