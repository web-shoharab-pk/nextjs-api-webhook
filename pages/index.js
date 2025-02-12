import styles from "@/styles/Home.module.css";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Next.js API with Webhook</title>
        <meta name="description" content="API documentation and example requests" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.main}>
          <h1>Next.js API with Webhook Documentation</h1>
          <h1>Task Details</h1>

          <code>
            <h2>BASE URL</h2>
            <p>https://nextjs-api-webhook.vercel.app</p>
            <h2>API Endpoints</h2>
            <pre>
              {`  
                1. POST /api/users
                2. GET /api/users (with JWT Authentication)
                3. GET /api/users/:id (with JWT Authentication) 
                4. POST /api/auth (Login - use can use user email and password to login)
                5. POST /api/generateSignature (Generate signature for webhook)
                6. POST /api/webhook (Webhook endpoint for verifying payloads and sending response)
              `}
            </pre>
          </code>
          <div className={styles.ctas}>
            <a
              className={styles.primary}
              href="https://documenter.getpostman.com/view/16481716/2sAYXBGezc"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on POSTMAN
            </a>
            <a
              className={styles.primary}
              href="https://github.com/web-shoharab-pk/nextjs-api-webhook"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Github
            </a>
            <a
              className={styles.primary}
              href="https://nextjs-api-webhook.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Live
            </a>
          </div>
        </main>
        <footer className={styles.footer}>
          <p>Next.js API with Webhook Documentation • Built with Next.js</p>
        </footer>
      </div>
    </>
  );
}
