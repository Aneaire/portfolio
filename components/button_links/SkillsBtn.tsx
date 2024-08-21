"use client";

import { useRouter } from "next/navigation";
import React from "react";

const SkillsBtn = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return <button onClick={() => router.push("/skills")}>{children}</button>;
};

export default SkillsBtn;
