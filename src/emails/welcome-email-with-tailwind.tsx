import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Link,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  username: string;
}

function WelcomeEmailWithTailwind({ username }: WelcomeEmailProps) {
  return (
    <Tailwind>
      <Head />
      <Preview>
        ようこそ {username}さん！アカウントが正常に作成されました。
      </Preview>
      <Body className="bg-white font-sans">
        <Container className="mx-auto w-[560px] px-0 py-5">
          <Heading className="mb-0 mt-10 text-2xl font-bold text-gray-700">
            ようこそ、{username}さん！
          </Heading>
          <Text className="text-base leading-7 text-gray-700">
            アカウントの作成が完了しました。私たちのサービスをご利用いただき、ありがとうございます。
          </Text>
          <Text className="text-base leading-7 text-gray-700">
            さっそく、以下のボタンをクリックしてダッシュボードにアクセスしてください！
          </Text>
          <Link
            className="mx-auto my-5 inline-block w-[200px] rounded bg-black px-4 py-3 text-center text-base text-white no-underline"
            href="https://localhost:3000"
            target="_blank"
          >
            ダッシュボードへ
          </Link>
          <Text className="text-base leading-7 text-gray-700">
            ご不明な点がございましたら、お気軽に
            <Link
              className="text-blue-600 underline"
              href="mailto:support@your-app.com"
            >
              サポートチーム
            </Link>
            までお問い合わせください。
          </Text>
          <Text className="mb-0 text-base leading-7 text-gray-700">
            よろしくお願いいたします。
          </Text>
          <Text className="mt-0 text-base leading-7 text-gray-700">
            Your Companyチーム
          </Text>
        </Container>
      </Body>
    </Tailwind>
  );
}

export default WelcomeEmailWithTailwind;
