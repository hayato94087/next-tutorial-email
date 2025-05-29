import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  username: string;
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "560px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0 0",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#000",
  borderRadius: "3px",
  color: "#fff",
  display: "block",
  fontSize: "16px",
  margin: "20px auto",
  padding: "12px",
  textAlign: "center" as const,
  textDecoration: "none",
  width: "200px",
};

const link = {
  color: "#2754C5",
  textDecoration: "underline",
};

function WelcomeEmail({ username }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        ようこそ {username}さん！アカウントが正常に作成されました。
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>ようこそ、{username}さん！</Heading>
          <Text style={text}>
            アカウントの作成が完了しました。私たちのサービスをご利用いただき、ありがとうございます。
          </Text>
          <Text style={text}>
            さっそく、以下のボタンをクリックしてダッシュボードにアクセスしてください！
          </Text>
          <Link
            href="https://localhost:3000"
            style={{
              ...button,
              display: "inline-block",
              textDecoration: "none",
            }}
            target="_blank"
          >
            ダッシュボードへ
          </Link>
          <Text style={text}>
            ご不明な点がございましたら、お気軽に
            <Link href="mailto:support@your-app.com" style={link}>
              サポートチーム
            </Link>
            までお問い合わせください。
          </Text>
          <Text style={{ ...text, marginBottom: "0" }}>
            よろしくお願いいたします。
          </Text>
          <Text style={{ ...text, marginTop: "0" }}>Your Companyチーム</Text>
        </Container>
      </Body>
    </Html>
  );
}

export default WelcomeEmail;
