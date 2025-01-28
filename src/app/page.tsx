import { SendEmailDemo } from "@/components/send-email-demo";
import { SendScheduledEmailDemo } from "@/components/send-scheduled-email-demo";
import { SendScheduledEmailwithAttachedLocalFileDemo } from "@/components/send-scheduled-email-with-attached-local-file-demo";
import { SendScheduledEmailwithAttachedRemoteFileDemo } from "@/components/send-scheduled-email-with-attached-remote-file-demo";

export default async function Home() {
  return (
    <main>
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-8">
          <SendEmailDemo />
          <SendScheduledEmailDemo />
          <SendScheduledEmailwithAttachedRemoteFileDemo />
          <SendScheduledEmailwithAttachedLocalFileDemo />
        </div>
      </div>
    </main>
  );
}
