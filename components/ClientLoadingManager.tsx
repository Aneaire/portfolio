"use client";

import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const LoadingOverlay = dynamic(() => import("@/components/ui/LoadingOverlay"), {
  ssr: false,
});

interface ClientLoadingManagerProps {
  children: React.ReactNode;
}

function ClientLoadingManager({ children }: ClientLoadingManagerProps) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Show loading on navigation
  React.useEffect(() => {
    const origPush = router.push;
    const origReplace = router.replace;
    router.push = (...args: [string, any?]) => {
      setLoading(true);
      origPush.apply(router, args);
    };
    router.replace = (...args: [string, any?]) => {
      setLoading(true);
      origReplace.apply(router, args);
    };
    return () => {
      router.push = origPush;
      router.replace = origReplace;
    };
  }, [router]);

  // Hide loading when pathname changes
  React.useEffect(() => {
    setLoading(false);
  }, [pathname]);

  return (
    <>
      <LoadingOverlay show={loading} />
      {children}
    </>
  );
}

export default ClientLoadingManager;
