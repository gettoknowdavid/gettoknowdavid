import React from "react";
import Link from "next/link";

export const BackButton: React.FC<{ styles?: string | undefined }> = ({
  styles,
}) => {
  return (
    <Link className={`${styles} z-50 fixed flex gap-1`} href={"/works"}>
      <span>[</span>
      <span>←</span>
      <span>]</span>
    </Link>
  );
};
