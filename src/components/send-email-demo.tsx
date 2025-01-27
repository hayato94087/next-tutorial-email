"use client";

import { useState } from "react";
import { hello } from "@/server/actions/email";

export function SendEmailDemo() {
  const [to, setTo] = useState("");
  const [username, setUsername] = useState("");

  return (
    <form
      action={async () => {
        await hello();
      }}
      className="space-y-4"
    >
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
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
        disabled={!to || !username}
      >
        メールを送信
      </button>
    </form>
  );
}
