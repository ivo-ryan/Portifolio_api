"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectPrisma = void 0;
const database_1 = require("../../database");
class ProjectPrisma {
    findAll() {
        return database_1.prisma.project.findMany();
    }
    create(attributes) {
        return database_1.prisma.project.create({ data: attributes });
    }
    update(id, attributes) {
        return database_1.prisma.project.update({
            where: { id },
            data: attributes
        });
    }
    delete(id) {
        return database_1.prisma.project.delete({ where: { id } });
    }
    findById(id) {
        return database_1.prisma.project.findUnique({ where: { id } });
    }
}
exports.ProjectPrisma = ProjectPrisma;
