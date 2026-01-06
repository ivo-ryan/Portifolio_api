import { beforeEach, describe, expect, it, vi } from 'vitest'
import { IProjectRepositorie, ProjectAttributes } from '../repositories/ProjectRepositorie';
import { ProjectService } from './ProjectService';

const projectRepositorieMock:IProjectRepositorie = {
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
    imgUrl: "exemplo.com/img.png"
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

    
});