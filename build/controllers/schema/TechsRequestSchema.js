import z from "zod";
export const TechsRequestSchema = z.object({
    name: z.string(),
    description: z.string(),
    imgUrl: z.string()
});
export const UpdateTechsRequestSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    imgUrl: z.string().optional()
});
