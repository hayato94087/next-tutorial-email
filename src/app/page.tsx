import { SendEmailDemo } from "@/components/send-email-demo";
import { env } from "@/env";

export default async function Home() {
  console.log("Server Components");
  console.log("RESEND_API_KEY", env.RESEND_API_KEY);
  console.log("RESEND_DOMAIN", env.RESEND_DOMAIN);

  return (
    <main>
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <SendEmailDemo />
        </div>
      </div>
    </main>
  );
}
