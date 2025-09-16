import OpenAI from "openai";
import { HttpError } from "../errors/HttpError";

export class OpenaiService{
    async chatMessage (message : string) {

        if(!message) new HttpError(404, "A menssagen não pode estar vazia!");

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_SECRET_KEY
        });

        if(!openai) new HttpError(500, "OPENAI_API_KEY missing")

        const response = await openai.responses.create({
            model: "gpt-5-nano",
            input: message,
            store: true
        });

        return response.output
    }
}