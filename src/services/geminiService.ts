
import { GoogleGenAI } from "@google/genai";
import { HttpError } from "../errors/HttpError";

const client = new GoogleGenAI({
  apiKey:  process.env.GEMINI_API_KEY!
} )


export class GeminiService {

  async chat(prompt: string) {

    if(!prompt || prompt.length === 0 ) throw new HttpError(400, "Prompt inválido!");

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    return response.text;

  }

}