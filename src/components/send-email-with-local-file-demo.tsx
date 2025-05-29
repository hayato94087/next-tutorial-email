"use client";

import { sendEmailWithLocalFile } from "@/app/actions/email";
import { useRef, useState } from "react";

export function SendEmailWithLocalFileDemo() {
  const [to, setTo] = useState("");
  const [username, setUsername] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "error" | "success" | undefined
  >();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setSelectedFile(file ?? undefined);
  }

  async function handleSendEmail() {
    if (!selectedFile) {
      setMessage("ファイルを選択してください");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    setMessage("");
    setMessageType(undefined);

    try {
      // ファイルをBase64に変換
      const fileBuffer = await selectedFile.arrayBuffer();
      const base64File = Buffer.from(fileBuffer).toString("base64");

      const result = await sendEmailWithLocalFile({
        attachment: {
          content: base64File,
          filename: selectedFile.name,
        },
        to,
        username,
      });

      if (result.error) {
        setMessage(`エラー: ${result.error.message}`);
        setMessageType("error");
      } else if (result.data) {
        setMessage("メールが正常に送信されました！");
        setMessageType("success");
        // フォームをリセット
        setTo("");
        setUsername("");
        setSelectedFile(undefined);
        // ファイル入力もリセット
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch {
      setMessage("予期しないエラーが発生しました");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <input
          className="w-[360px] rounded border px-3 py-2"
          disabled={isLoading}
          onChange={(e) => setTo(e.target.value)}
          placeholder="メールアドレス"
          type="email"
          value={to}
        />
        <input
          className="w-[360px] rounded border px-3 py-2"
          disabled={isLoading}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="ユーザー名"
          type="text"
          value={username}
        />
        <div className="flex flex-col gap-1">
          <input
            className="w-[360px] rounded border px-3 py-2 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            disabled={isLoading}
            onChange={handleFileChange}
            ref={fileInputRef}
            type="file"
          />
          {selectedFile && (
            <p className="text-sm text-gray-600">
              選択されたファイル: {selectedFile.name} (
              {Math.round(selectedFile.size / 1024)}KB)
            </p>
          )}
        </div>
      </div>

      {message && (
        <div
          className={`rounded px-4 py-2 text-sm ${
            messageType === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
        disabled={!to || !username || !selectedFile || isLoading}
        onClick={handleSendEmail}
      >
        {isLoading ? "送信中..." : "選択したファイルを添付してメール送信"}
      </button>
    </div>
  );
}
