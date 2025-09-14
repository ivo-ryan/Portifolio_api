import z from "zod";

export const ProjetRequestSchema = z.object({
    name: z.string(),
    description: z.string(),
    imgUrl: z.string(),
    vercelUrl: z.string(),
    gitUrl: z.string(),
    technologies: z.string()
});

export const UpdateProjectRequestSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    imgUrl: z.string().optional(),
    vercelUrl: z.string().optional(),
    gitUrl: z.string().optional(),
    tecnologies: z.string().optional()
})