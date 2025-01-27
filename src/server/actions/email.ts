"use server";

// このファイル全体をServer Actionsとして定義
// import EmailTemplate from "@/emails/welcome-email";
import { env } from "@/env";

// import { resend } from "@/lib/resend";

type SendEmailResponse = {
  data: { id: string } | null;
  error: Error | null;
};

type SendEmailParams = {
  from?: string;
  to: string;
  username: string;
};

// export async function sendWelcomeEmail({
//   // from = `Acme <onboarding@${env.RESEND_DOMAIN}>`,
//   // from = `Acme <onboarding@`,
//   from = `Acme <onboarding@${process.env.RESEND_DOMAIN}>`,
//   to,
//   username,
// }: SendEmailParams): Promise<SendEmailResponse> {
//   // 件名
//   const subject = "アカウントの作成が完了しました";
//   // 本文
//   const react = EmailTemplate({ username });

//   return { data: null, error: null };
//   // try {
//   //   const { data, error } = await resend.emails.send({
//   //     from,
//   //     to,
//   //     subject,
//   //     react,
//   //   });

//   //   if (error) {
//   //     return { data: null, error };
//   //   }

//   //   return { data, error: null };
//   // } catch (error) {
//   //   return {
//   //     data: null,
//   //     error:
//   //       error instanceof Error ? error : new Error("Unknown error occurred"),
//   //   };
//   // }
// }

export async function sendWelcomeEmail({
  // from = `Acme <onboarding@${env.RESEND_DOMAIN}>`,
  // from = `Acme <onboarding@`,
  from = `Acme <onboarding@`,
  to,
  username,
}: SendEmailParams): Promise<SendEmailResponse> {
  console.log(env.RESEND_DOMAIN);
  return { data: null, error: null };
}
