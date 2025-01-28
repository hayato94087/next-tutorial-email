"use client";

import { useState } from "react";
import { sendScheduledEmail } from "@/server/actions/email";

export function SendScheduledEmailDemo() {
  const [to, setTo] = useState("");
  const [username, setUsername] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="メールアドレス"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-[360px] rounded border px-3 py-2"
        />
        <input
          type="text"
          placeholder="ユーザー名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-[360px] rounded border px-3 py-2"
        />
      </div>
      <button
        onClick={async () => {
          await sendScheduledEmail({
            to,
            username,
          });
        }}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
        disabled={!to || !username}
      >
        メール配信を予約
      </button>
    </div>
  );
}
