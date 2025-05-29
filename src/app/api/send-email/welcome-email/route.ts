import EmailTemplate from "@/emails/welcome-email";
import { resend } from "@/lib/resend";
import type { ReactElement } from "react";

interface EmailRequest {
  from: string;
  to: string;
  username: string;
}

export async function POST(request: Request) {
  const { from, to, username } = (await request.json()) as EmailRequest;

  const subject = "アカウントの作成が完了しました"; // 件名
  const react: ReactElement = EmailTemplate({ username }); // 本文

  try {
    const { data, error } = await resend.emails.send({
      from,
      react,
      subject,
      to,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
