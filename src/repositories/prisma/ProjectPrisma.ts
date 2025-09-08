import { Project } from "@prisma/client";
import { IProjectRepositorie, ProjectAttributes } from "../ProjectRepositorie";
import { prisma } from "../../database";

export class ProjectPrisma implements IProjectRepositorie {
    findAll () : Promise<Project[]>{
        return prisma.project.findMany();
    }

    create (attributes: ProjectAttributes) : Promise<Project>{
        return prisma.project.create({ data: attributes });
    }

    update (id: number, attributes: Partial<ProjectAttributes>): Promise<Project | null>{
        return prisma.project.update({
            where: { id },
            data: attributes
        })
    }

    delete (id: number) : Promise<Project | null>{
        return prisma.project.delete({ where: { id } });
    }

    findById (id: number) : Promise<Project | null>{
        return prisma.project.findUnique({ where: { id } });
    }


}

