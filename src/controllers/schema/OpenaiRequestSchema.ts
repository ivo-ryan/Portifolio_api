import z from "zod";

export const OpenaiRequestSchema = z.object({
    prompt: z.string()
});