import cors from "cors";
import express from "express";
import { router } from "./routes";
import path from "path";

const app = express();

app.use(express.json());
app.use(cors());
app.use('/public', express.static(path.join(process.cwd(), 'public')));
app.use("/api",router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App runing in http://localhost:${PORT}`));