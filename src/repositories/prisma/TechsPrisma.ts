import { Techs } from "@prisma/client";
import { CreateTechsAttributes, ITechsRepository } from "../TechsRepository";
import { prisma } from "../../database";

export class TechsPrisma implements ITechsRepository {
    findAll () : Promise<Techs[]>{
        return prisma.techs.findMany();
    }

    create (attributes: CreateTechsAttributes) : Promise<Techs>{
        return prisma.techs.create({ data: attributes });
    }

    update (id: number, attributes: Partial<CreateTechsAttributes>) : Promise<Techs | null>{
        return prisma.techs.update({
            where: { id },
            data: attributes
        });
    }

    delete (id: number) : Promise<Techs | null>{
        return prisma.techs.delete({ where: { id } });
    }

    findById (id: number) : Promise<Techs | null>{
        return prisma.techs.findUnique({ where: { id } })
    }

    
}