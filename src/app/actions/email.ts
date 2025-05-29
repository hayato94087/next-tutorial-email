"use server";

import EmailTemplate from "@/emails/welcome-email";
import { env } from "@/env";
import { Resend } from "resend";
import fs from "node:fs";

const resend = new Resend(env.RESEND_API_KEY);

interface SendEmailParams {
  attachment?: {
    content: string;
    filename: string;
  };
  from?: string;
  to: string;
  username: string;
}

interface SendEmailResponse {
  data: undefined | { id: string };
  error: Error | undefined;
}

export async function sendEmailWithLocalFile({
  attachment,
  from = `Acme <onboarding@${env.RESEND_DOMAIN}>`,
  to,
  username,
}: SendEmailParams): Promise<SendEmailResponse> {
  // 件名
  const subject = "Receipt for your payment";

  try {
    let attachmentData;

    if (attachment) {
      // ユーザーが選択したファイルを使用
      attachmentData = [
        {
          content: attachment.content,
          filename: attachment.filename,
        },
      ];
    } else {
      // デフォルトファイルを使用（後方互換性のため）
      const filePath = "./public/invoice.pdf";
      if (!fs.existsSync(filePath)) {
        return {
          data: undefined,
          error: new Error("添付ファイルが見つかりません"),
        };
      }
      const defaultAttachment = fs.readFileSync(filePath).toString("base64");
      attachmentData = [
        {
          content: defaultAttachment,
          filename: "invoice.pdf",
        },
      ];
    }

    const { data, error } = await resend.emails.send({
      attachments: attachmentData,
      from,
      html: `<p>To ${username}, Thanks for the payment.</p>`,
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

export async function sendEmailWithRemoteFile({
  from = `Acme <onboarding@${env.RESEND_DOMAIN}>`,
  to,
  username,
}: SendEmailParams): Promise<SendEmailResponse> {
  // 件名
  const subject = "Receipt for your payment";

  try {
    const { data, error } = await resend.emails.send({
      attachments: [
        {
          filename: "invoice.pdf",
          path: "https://resend.com/static/sample/invoice.pdf",
        },
      ],
      from,
      html: `<p>To ${username}, Thanks for the payment.</p>`,
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
      react,
      scheduledAt: fiveinuteFromNow,
      subject,
      to,
    });

    if (error) {
      return { data: undefined, error };
    }

    if (!data) {
      return {
        data: undefined,
        error: new Error("メール送信予約に失敗しました"),
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
