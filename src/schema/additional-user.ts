import { z } from "zod";

export const additionalUserFirstStep = z.object({
  name: z
    .string()
    .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
      message: "SCHEMA.USERNAME.SPECIAL_CHARS",
    })
    .optional(),

  surname: z
    .string()
    .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
      message: "SCHEMA.USERNAME.SPECIAL_CHARS",
    })
    .optional(),
});

export type AdditionalUserFirstStep = z.infer<
  typeof additionalUserFirstStep
>;

export const additionalUserSecondStep = z.object({
  useCase: z.enum(["WORK", "STUDY", "PERSONAL_USER"], {
    required_error: "You need to select a notification type.",
  }),
});

export type AdditionalUserSecondStep = z.infer<
  typeof additionalUserSecondStep
>;