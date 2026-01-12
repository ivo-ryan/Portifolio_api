import z from "zod";

export const GeminiRequestSchema = z.object({
    prompt: z.string()
});