import { SendEmailDemo } from "@/components/send-email-demo";
import { SendScheduledEmailDemo } from "@/components/send-scheduled-email-demo";

export default async function Home() {
  return (
    <main>
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-8">
          <SendEmailDemo />
          <SendScheduledEmailDemo />
        </div>
      </div>
    </main>
  );
}
