import cors from "cors";
import express from "express";
import { router } from "./routes";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "../public");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(publicPath));
app.use("/api",router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App runing in http://localhost:${PORT}`));