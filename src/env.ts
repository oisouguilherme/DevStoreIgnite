import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
});

const parseEnv = envSchema.safeParse(process.env);

if (!parseEnv.success) {
  console.error("Parametros invalidos", parseEnv.error.flatten().fieldErrors);

  throw new Error("Parametros invalidos");
}

export const env = parseEnv.data;
