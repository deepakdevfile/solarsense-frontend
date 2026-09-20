import type { Metadata } from "next";
// import "./globals.css";
import NavBar from "@/ui/navbar";

export const metadata: Metadata = {
  title: "SolarSense App",
  description: "Created by Devfile",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <header>
          <NavBar />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
