"use client";

import { useState } from "react";
import { sendWelcomeEmail } from "@/app/actions/email";

export function SendEmailDemo() {
  const [to, setTo] = useState("");
  const [username, setUsername] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <input
          className="border rounded px-3 py-2 w-[360px]"
          onChange={(e) => setTo(e.target.value)}
          placeholder="メールアドレス"
          type="email"
          value={to}
        />
        <input
          className="border rounded px-3 py-2 w-[360px]"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="ユーザー名"
          type="text"
          value={username}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
        disabled={!to || !username}
        onClick={async () => {
          await sendWelcomeEmail({
            to,
            username,
          });
        }}
      >
        メールを送信
      </button>
    </div>
  );
}
