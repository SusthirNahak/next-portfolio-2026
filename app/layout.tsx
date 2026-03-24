import "./globals.css";
import Navbar from "@/components/common/Navbar";

export const metadata = {
  title: "Susthir Portfolio",
  description: "Next.js Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}