import { SendEmailDemo } from "@/components/send-email-demo";

export default async function Home() {
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
