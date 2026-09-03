import { z } from "zod";

export const CompanySchema = z.object({
  id: z.number(),
  image: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string(),
  industries: z.string(),
  detail: z.string(),
  officialsite: z.string(),
  twitter: z.string().optional().default(""),
  instagram: z.string().optional().default(""),
});

export type Company = z.infer<typeof CompanySchema>;
