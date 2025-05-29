import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    DEBUG_MESSAGE: process.env.DEBUG_MESSAGE,
    NODE_ENV: process.env.NODE_ENV,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  server: {
    /**
     * テスト用のメッセージ
     */
    DEBUG_MESSAGE: z.string(),
    /**
     * 環境
     */
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    /**
     * Resend API キー
     */
    RESEND_API_KEY: z.string(),
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
