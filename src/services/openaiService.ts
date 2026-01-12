import OpenAI from "openai";
import { HttpError } from "../errors/HttpError";

export class OpenAiService {

  async chat(prompt: string) {

    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    if(!prompt || prompt.length === 0) throw new HttpError(400, "Prompt is required");

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "Você é um assistente técnico." },
        { role: "user", content: prompt },
      ],
    });

    if(!response.choices || response.choices.length === 0) throw new HttpError(500, "No response from OpenAI");

    return response.choices[0].message.content;
  }
}
