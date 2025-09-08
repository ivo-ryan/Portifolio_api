import { prisma } from "../../database";
export class ProjectPrisma {
    findAll() {
        return prisma.project.findMany();
    }
    create(attributes) {
        return prisma.project.create({ data: attributes });
    }
    update(id, attributes) {
        return prisma.project.update({
            where: { id },
            data: attributes
        });
    }
    delete(id) {
        return prisma.project.delete({ where: { id } });
    }
    findById(id) {
        return prisma.project.findUnique({ where: { id } });
    }
}
