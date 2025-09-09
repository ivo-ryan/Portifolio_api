"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProjectRequestSchema = exports.ProjetRequestSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.ProjetRequestSchema = zod_1.default.object({
    name: zod_1.default.string(),
    description: zod_1.default.string(),
    imgUrl: zod_1.default.string(),
    vercelUrl: zod_1.default.string()
});
exports.UpdateProjectRequestSchema = zod_1.default.object({
    name: zod_1.default.string().optional(),
    description: zod_1.default.string().optional(),
    imgUrl: zod_1.default.string().optional(),
    vercelUrl: zod_1.default.string().optional()
});
