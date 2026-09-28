import { z } from "zod";

export const contactSubmissionSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(7).max(30),
  service: z.string().trim().min(2).max(100),
  message: z.string().trim().min(2).max(5000),
  source: z.string().trim().max(100).optional(),
  website: z.string().trim().max(200).optional(),
});

export const communityQuestionSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(160),
  title: z.string().trim().min(5).max(180),
  content: z.string().trim().min(10).max(5000),
  website: z.string().trim().max(200).optional(),
});
