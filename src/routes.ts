import { Router } from "express";
import { geminiController, projectController, techsController } from "./container";


export const router = Router();

router.post("/chat", geminiController.chat)

router.get("/projects", projectController.index);
router.post("/projects", projectController.create);
router.put("/projects/:id", projectController.update);
router.delete("/projects/:id", projectController.delete);

router.get("/techs", techsController.index);
router.post("/techs", techsController.create);
router.put("/techs/:id", techsController.update);
router.delete("/techs/:id", techsController.delete);
