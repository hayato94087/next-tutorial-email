import { SendEmailDemo } from "@/components/send-email-demo";

function Page() {
  return (
    <main>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <SendEmailDemo />
        </div>
      </div>
    </main>
  );
}

export default Page;
