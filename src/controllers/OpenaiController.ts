import { Handler } from "express";
import { OpenaiService } from "../services/OpenaiService";
import { OpenaiRequestSchema } from "./schema/OpenaiRequestSchema";

export class OpenaiController {
    constructor(readonly openaiService: OpenaiService){}

    chat: Handler = async (req , res , next) => {
        try {
            const messageReq = OpenaiRequestSchema.parse(req.body);
            const response = await this.openaiService.chatMessage(messageReq.message);
            res.status(201).json(response);

        } catch (error) {
            next(error) 
        }
    }
}