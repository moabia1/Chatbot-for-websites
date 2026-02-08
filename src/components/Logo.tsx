import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex-1 flex items-center text-2xl">
      <span className="inline-block font-medium text-foreground">
        Assist
      </span>
      <span className="font-semibold text-primary">-AI </span>
    </Link>
  );
};

export default Logo;
