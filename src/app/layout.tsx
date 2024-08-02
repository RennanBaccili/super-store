'use client';

import "./globals.css";
import Navbar from "./components/navbar";
import AuthModal from "./auth/Auth";
import { useState } from "react";
import { AuthProvider } from "./auth/AuthContext.";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <html lang="en">
      <body className="h-screen">
        <div>
          <AuthProvider>
            <Navbar onLoginClick={() => setModalOpen(true)} />
            <AuthModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />     
            {children}
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
