"use client";

import React from "react";
import { SessionProvider } from "@/components/auth/session-provider";

// <CHANGE> Added ScrollToTop component to reset scroll position when navigating
function ScrollToTop() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <ScrollToTop />
      {children}
    </SessionProvider>
  );
}
