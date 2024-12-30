import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "./components/navbar";
import Providers from "./providers";

// export const metadata = {
//   title: "BlogIt",
//   description: "Blogging platform",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-gradient-to-br from-orange-400/[1] to-red-400/[1] h-[100vh]`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
