import z from "zod";

export const OpenaiRequestSchema = z.object({
    message: z.string()
});