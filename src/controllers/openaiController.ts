import { Handler} from "express";
import { OpenAiService } from "../services/openaiService";
import { OpenaiRequestSchema } from "./schema/OpenaiRequestSchema";

export class AiController {
    constructor( readonly openaiService: OpenAiService ) {}

  chat: Handler = async (req, res, next) => {
   try {
        const { prompt } = OpenaiRequestSchema.parse(req.body);
        const answer = await this.openaiService.chat(prompt);
        return res.json({ answer });
   } catch (error) {
         next(error);
   }

  }
}
