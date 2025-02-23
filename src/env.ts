import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    /**
     * 環境
     */
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    /**
     * Prisma Client がデータベースへ接続するためのデータベース接続先
     */
    DATABASE_URL: z.string().url(),
    /**
     * Prisma CLI がデータベースの操作をするためのデータベース接続先
     */
    DIRECT_URL: z.string().url(),
    /**
     * Resend API キー
     */
    RESEND_API_KEY: z.string(),
    /**
     * Resend で利用するドメイン
     */
    RESEND_DOMAIN: z.string().min(1, {
      message: "RESEND_DOMAINは必須です",
    }),
  },
  client: {
    /**
     * Supabase の URL
     */
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    /**
     * Supabase の匿名キー
     */
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_DOMAIN: process.env.RESEND_DOMAIN,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
