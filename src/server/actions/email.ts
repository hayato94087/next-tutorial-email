"use server";

import EmailTemplate from "@/emails/welcome-email";
import { env } from "@/env";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendEmailResponse = {
  data: { id: string } | null;
  error: Error | null;
};

type SendEmailParams = {
  from?: string;
  to: string;
  username: string;
};

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
      to,
      subject,
      react,
    });

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error ? error : new Error("Unknown error occurred"),
    };
  }
}
