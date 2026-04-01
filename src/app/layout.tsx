import type { Metadata } from "next";
import React from 'react';
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import BackgroundParticles from "@/components/shared/BackgroundParticles";

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
    weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Purbashis Behera — AI Engineer | OS v1.0",
    description: " Portfolio of Purbashis Behera | OS v1.0",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`}>
            <body className="antialiased min-h-screen bg-[#050508] text-gray-100 font-sans relative overflow-hidden">
                <BackgroundParticles />
                <div className="relative z-10 w-full min-h-screen">
                    {children}
                </div>
            </body>
        </html>
    );
}
