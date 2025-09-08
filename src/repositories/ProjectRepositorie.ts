import { Project } from "@prisma/client";

export interface ProjectAttributes {
    name: string;
    description: string;
    imgUrl: string;
    vercelUrl: string
}

export interface IProjectRepositorie {
    findAll: () => Promise<Project[]>
    create: (attributes: ProjectAttributes) => Promise<Project>
    update: (id: number, attributes: Partial<ProjectAttributes>) => Promise<Project | null>
    delete: (id:number) => Promise<Project | null>
    findById: (id: number) => Promise<Project | null>
}