import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { getServerSession, Session } from "next-auth";
import AppProviders from "@/lib/providers/Index";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Google place",
  description:
    "The software is a CRM-type cloud system which stores the investors’ data and communications with a client, as well as provides the analysis of prospective investors",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={`overflow-hidden ${inter.className}`}>
        {/* {children} */}
        <AppProviders session={session as Session}>{children}</AppProviders>
      </body>
    </html>
  );
};
export default RootLayout;
