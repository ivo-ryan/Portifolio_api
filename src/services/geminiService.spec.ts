import { describe, expect, it, vi } from "vitest";
import { GeminiService } from "./geminiService";
import { HttpError } from "../errors/HttpError";
import * as GenAIModule from "@google/genai";

const generateContentMock =
  (GenAIModule as any).__mocks__.generateContentMock;

vi.mock("@google/genai", () => {
  const generateContentMock = vi.fn();

  return {
    GoogleGenAI: vi.fn(function () {
      return {
        models: {
          generateContent: generateContentMock
        }
      };
    }),

    __mocks__: {
      generateContentMock
    }
  };
});



describe("Gemini Service", () => {
    const service = new GeminiService();

    it("Deve retornar a resposta da IA", async () => {
        generateContentMock.mockResolvedValueOnce({ text: "TypeScript é uma linguagem de programação que estende o JavaScript." });

        const prompt = "Explique o que é TypeScript.";
        const response = await service.chat(prompt);

        expect(generateContentMock).toHaveBeenCalledWith({
            model: "gemini-2.5-flash",
            contents: prompt
        });
        expect(response).toBe("TypeScript é uma linguagem de programação que estende o JavaScript.");
        
    });

    it("Deve lançar um erro para prompt inválido", async () => {
        await expect(service.chat("")).rejects.toThrow("Prompt inválido!");  
        await expect(service.chat("")).rejects.toBeInstanceOf(HttpError);
        await expect(service.chat("")).rejects.toMatchObject({ status: 400 });
    });
})