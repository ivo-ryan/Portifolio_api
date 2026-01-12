import OpenAI from "openai";
import { HttpError } from "../errors/HttpError";

export class OpenAiService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async chat(prompt: string) {
    if(!prompt || prompt.length === 0) throw new HttpError(400, "Prompt is required");

    const response = await this.client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "Você é um assistente técnico." },
        { role: "user", content: prompt },
      ],
    });

    return response.choices[0].message.content;
  }
}
