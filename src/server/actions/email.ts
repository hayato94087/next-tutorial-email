"use server";

// このファイル全体をServer Actionsとして定義
import fs from "fs";
import path from "path";
import { cwd } from "process";
import EmailTemplate from "@/emails/welcome-email";
import { env } from "@/env";
import { resend } from "@/lib/resend";

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

export async function sendScheduledEmail({
  from = `Acme <onboarding@${env.RESEND_DOMAIN}>`,
  to,
  username,
}: SendEmailParams): Promise<SendEmailResponse> {
  // 件名
  const subject = "アカウントの作成が完了しました";
  // 本文
  const react = EmailTemplate({ username });

  // 5分後に送信
  const fiveinuteFromNow = new Date(Date.now() + 1000 * 60 * 5).toISOString();

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      react,
      scheduledAt: fiveinuteFromNow,
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

export async function sendScheduledEmailWithAttachedRemoteFile({
  from = `Acme <onboarding@${env.RESEND_DOMAIN}>`,
  to,
  username,
}: SendEmailParams): Promise<SendEmailResponse> {
  // 件名
  const subject = "Receipt for your payment";

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html: `<p>To ${username}, Thanks for the payment.</p>`,
      attachments: [
        {
          path: "https://resend.com/static/sample/invoice.pdf",
          filename: "invoice.pdf",
        },
      ],
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

export async function sendScheduledEmailWithAttachedLocalFile({
  from = `Acme <onboarding@${env.RESEND_DOMAIN}>`,
  to,
  username,
}: SendEmailParams): Promise<SendEmailResponse> {
  // 件名
  const subject = "Receipt for your payment";

  const filepath = path.join(cwd(), "public", "invoice.pdf");
  const attachment = fs.readFileSync(filepath).toString("base64");

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html: `<p>To ${username}, Thanks for the payment.</p>`,
      attachments: [
        {
          content: attachment,
          filename: "invoice.pdf",
        },
      ],
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
