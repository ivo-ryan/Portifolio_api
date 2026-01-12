import { AiController } from "./controllers/openaiController";
import { ProjectController } from "./controllers/ProjectController";
import { TechsController } from "./controllers/TechsController";
import { ProjectPrisma } from "./repositories/prisma/ProjectPrisma";
import { TechsPrisma } from "./repositories/prisma/TechsPrisma";
import { OpenAiService } from "./services/openaiService";
import { ProjectService } from "./services/ProjectService";
import { TechsService } from "./services/TechsService";


const projectPrismaRepositorie = new ProjectPrisma();
const techsPrismaRepositorie = new TechsPrisma();

const projectService = new ProjectService(projectPrismaRepositorie);
const techsService = new TechsService(techsPrismaRepositorie);
const openaiService = new OpenAiService();

export const projectController = new ProjectController(projectService);
export const techsController = new TechsController(techsService);
export const openaiController = new AiController(openaiService);