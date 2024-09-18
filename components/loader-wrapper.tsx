"use client";

import React, { useEffect, useState } from "react";

import { RootLoader } from "@/components/root-loader";

export const LoaderWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 6000);

    return () => clearTimeout(timeout);
  }, []);

  const finishLoading = () => setIsLoading(false);

  return (
    <>{isLoading ? <RootLoader finishLoading={finishLoading} /> : children}</>
  );
};
