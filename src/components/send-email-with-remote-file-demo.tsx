"use client";

import { useState } from "react";
import { sendEmailWithRemoteFile } from "@/app/actions/email";

export function SendEmailWithRemoteFileDemo() {
  const [to, setTo] = useState("");
  const [username, setUsername] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <input
          className="w-[360px] rounded border px-3 py-2"
          onChange={(e) => setTo(e.target.value)}
          placeholder="メールアドレス"
          type="email"
          value={to}
        />
        <input
          className="w-[360px] rounded border px-3 py-2"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="ユーザー名"
          type="text"
          value={username}
        />
      </div>
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
        disabled={!to || !username}
        onClick={async () => {
          await sendEmailWithRemoteFile({
            to,
            username,
          });
        }}
      >
        リモートファイルを添付したメールを送信
      </button>
    </div>
  );
}
