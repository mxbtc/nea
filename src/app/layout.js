"use client";

import './globals.css'
import { Inter } from 'next/font/google'
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en"><SessionProvider><body>{children}</body></SessionProvider></html>
  )
}
