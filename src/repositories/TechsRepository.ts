import { Techs } from "@prisma/client";

export interface CreateTechsAttributes {
    name: string;
    description: string;
    imgUrl: string
}


export interface ITechsRepository{
    findAll: () => Promise<Techs[]>;
    create: (attributes: CreateTechsAttributes) => Promise<Techs>;
    update: (id: number, attributes: Partial<CreateTechsAttributes>) => Promise<Techs | null>
    delete: (id: number) => Promise<Techs | null>
    findById: (id: number) => Promise<Techs | null>

}