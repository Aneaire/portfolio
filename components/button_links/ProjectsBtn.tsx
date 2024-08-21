"use client";

import { useRouter } from "next/navigation";
import React from "react";

const ProjectsBtn = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return <button onClick={() => router.push("/projects")}>{children}</button>;
};

export default ProjectsBtn;
