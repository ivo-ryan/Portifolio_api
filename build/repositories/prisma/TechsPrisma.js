import { prisma } from "../../database";
export class TechsPrisma {
    findAll() {
        return prisma.techs.findMany();
    }
    create(attributes) {
        return prisma.techs.create({ data: attributes });
    }
    update(id, attributes) {
        return prisma.techs.update({
            where: { id },
            data: attributes
        });
    }
    delete(id) {
        return prisma.techs.delete({ where: { id } });
    }
    findById(id) {
        return prisma.techs.findUnique({ where: { id } });
    }
}
