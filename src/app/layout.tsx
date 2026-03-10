import CustomCursor from "@/components/shared/CustomCursor";
import type { Metadata } from "next";
import React from 'react';
import "./globals.css";

export const metadata: Metadata = {
    title: "Purbashis Behera | Software Engineer",
    description: "Software Engineer · LLMs · RAG Architect. Explore the legendary artifacts and chronicles of Purbashis Behera.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased min-h-screen bg-void relative">
                <CustomCursor />
                {children}
                <div className="noise-overlay" />
                <div className="vignette" />
            </body>
        </html>
    );
}
