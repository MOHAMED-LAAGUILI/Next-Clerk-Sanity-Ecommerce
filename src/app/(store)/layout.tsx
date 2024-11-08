import type { Metadata } from "next";
import "../globals.css"; // Import global styles
import { ClerkProvider } from "@clerk/nextjs"; // Clerk for authentication
import Header from "./../../components/Header";
import { SanityLive } from "@/sanity/lib/live";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { DisableDraftMode } from "@/components/DisableDraftModeBtn";

// Metadata for the page
export const metadata: Metadata = {
  title: "Eshoper.eco",
  description: "dev moha",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // Specify children prop type
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body className={`antialiased`}>
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing />
            </>
          )}
          <main>
            <Header />

            {children}
          </main>
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}
