"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from '@/store'; 
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import LoadingOverlay from "../components/LoadingOverlay";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement initial
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="fr">
      <head>
        <title>Les Chroniques de Lyra</title>
        <meta name="description" content="Explore ton avenir professionnel dans un monde fantastique" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <Provider store={store}>
          {loading ? (
            <LoadingOverlay />
          ) : (
            <>
              <Header />
              <main className="flex-grow container mx-auto p-4 transition-all duration-300 ease-in-out">
                {children}
              </main>
              <Footer />
            </>
          )}
        </Provider>
      </body>
    </html>
  );
}