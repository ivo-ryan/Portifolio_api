import { beforeEach, describe, expect, it, vi } from "vitest";
import { GeminiService } from "../services/geminiService";
import { AiController } from "./GeminiController";

const geminiServiceMock = {
    chat: vi.fn().mockResolvedValue("Esta é uma resposta gerada pela IA.")

} as unknown as GeminiService;

describe("AiController", () => {
    const controller = new AiController(geminiServiceMock);

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Deve retornar uma resposta da IA com status 200", async () => {
        const req: any = {
            body: {
                prompt: "Olá, IA!"
            }
        };

        const res: any = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        const next = vi.fn();

        await controller.chat(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ answer: "Esta é uma resposta gerada pela IA." });

        expect(geminiServiceMock.chat).toHaveBeenCalledTimes(1);
        expect(geminiServiceMock.chat).toHaveBeenCalledWith("Olá, IA!");
    });

    it("Deve chamar next em caso de erro no serviço da IA", async () => {
        const req: any = {
            body: {
                prompt: "Olá, IA!"
            }
        };
        const res: any = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };
        const next = vi.fn();
        const error = new Error("Erro no serviço da IA");
        geminiServiceMock.chat = vi.fn().mockRejectedValueOnce(error);

        await controller.chat(req, res, next);
        expect(next).toHaveBeenCalledWith(error);
        expect(geminiServiceMock.chat).toHaveBeenCalledTimes(1);
    });
});