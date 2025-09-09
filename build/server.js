"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/public', express_1.default.static(path_1.default.join(process.cwd(), 'public')));
app.use("/api", routes_1.router);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App runing in http://localhost:${PORT}`));
