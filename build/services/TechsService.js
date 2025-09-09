"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechsService = void 0;
const HttpError_1 = require("../errors/HttpError");
class TechsService {
    constructor(techsRepositorie) {
        this.techsRepositorie = techsRepositorie;
    }
    findAllTechs() {
        return __awaiter(this, void 0, void 0, function* () {
            const findAll = yield this.techsRepositorie.findAll();
            return findAll;
        });
    }
    create(attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTech = yield this.techsRepositorie.create(attributes);
            return newTech;
        });
    }
    techExists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tech = yield this.techsRepositorie.findById(id);
            if (!tech)
                new HttpError_1.HttpError(404, "Tech não encontrada!");
        });
    }
    update(id, attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.techExists(id);
            const updatedTech = yield this.techsRepositorie.update(id, attributes);
            return updatedTech;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.techExists(id);
            const deletedTech = yield this.techsRepositorie.delete(id);
        });
    }
}
exports.TechsService = TechsService;
