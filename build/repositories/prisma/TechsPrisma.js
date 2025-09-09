"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechsPrisma = void 0;
const database_1 = require("../../database");
class TechsPrisma {
    findAll() {
        return database_1.prisma.techs.findMany();
    }
    create(attributes) {
        return database_1.prisma.techs.create({ data: attributes });
    }
    update(id, attributes) {
        return database_1.prisma.techs.update({
            where: { id },
            data: attributes
        });
    }
    delete(id) {
        return database_1.prisma.techs.delete({ where: { id } });
    }
    findById(id) {
        return database_1.prisma.techs.findUnique({ where: { id } });
    }
}
exports.TechsPrisma = TechsPrisma;
