import { Handler} from "express";
import { GeminiService } from "../services/geminiService";
import { GeminiRequestSchema } from "./schema/GeminiRequestSchema";

export class AiController {
    constructor( readonly openaiService: GeminiService ) {}

  chat: Handler = async (req, res, next) => {
   try {
        const { prompt } = GeminiRequestSchema.parse(req.body);
        const answer = await this.openaiService.chat(prompt);
        return res.json({ answer });
   } catch (error) {
         next(error);
   }

  }
}
