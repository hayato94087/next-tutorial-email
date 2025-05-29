"use server";

import EmailTemplate from "@/emails/welcome-email";
import { env } from "@/env";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

interface SendEmailParams {
  from?: string;
  to: string;
  username: string;
}

interface SendEmailResponse {
  data: undefined | { id: string };
  error: Error | undefined;
}

export async function sendWelcomeEmail({
  from = `Acme <onboarding@${env.RESEND_DOMAIN}>`,
  to,
  username,
}: SendEmailParams): Promise<SendEmailResponse> {
  // 件名
  const subject = "アカウントの作成が完了しました";
  // 本文
  const react = EmailTemplate({ username });

  try {
    const { data, error } = await resend.emails.send({
      from,
      react,
      subject,
      to,
    });

    if (error) {
      return { data: undefined, error };
    }

    if (!data) {
      return {
        data: undefined,
        error: new Error("メール送信に失敗しました"),
      };
    }

    return { data, error: undefined };
  } catch (error) {
    return {
      data: undefined,
      error:
        error instanceof Error ? error : new Error("Unknown error occurred"),
    };
  }
}
