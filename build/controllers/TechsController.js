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
exports.TechsController = void 0;
const TechsRequestSchema_1 = require("./schema/TechsRequestSchema");
class TechsController {
    constructor(techsService) {
        this.techsService = techsService;
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const techs = yield this.techsService.findAllTechs();
                res.json(techs);
            }
            catch (error) {
                next(error);
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = TechsRequestSchema_1.TechsRequestSchema.parse(req.body);
                const newTech = yield this.techsService.create(body);
                res.status(201).json(newTech);
            }
            catch (error) {
                next(error);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = TechsRequestSchema_1.UpdateTechsRequestSchema.parse(req.body);
                const id = +req.params.id;
                const updatedTech = yield this.techsService.update(id, body);
                res.json(updatedTech);
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = +req.params.id;
                const deletedTech = yield this.techsService.delete(id);
                res.json(deletedTech);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.TechsController = TechsController;
