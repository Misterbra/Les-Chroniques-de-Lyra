"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store from "../store";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Provider store={store}>
          <Header />
          <main className="flex-grow container mx-auto p-4">{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
