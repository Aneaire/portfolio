import React from "react";
import ProjectsBtn from "../button_links/ProjectsBtn";
import SkillsBtn from "../button_links/SkillsBtn";
import { ArrowRight } from "lucide-react";

type links = ["/skills", "/projects"];

const AddOn = ({
  title,
  children,
  goto,
}: {
  title: string;
  children: React.ReactNode;
  goto: links[number];
}) => {
  return (
    <div className="space-y-2 pt-5">
      {goto === "/skills" && (
        <SkillsBtn>
          <div className="group flex w-fit items-center gap-2 border border-border px-4 py-2 transition-colors hover:border-primary">
            <h2 className="text-base font-semibold text-foreground">{title}</h2>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
          </div>
        </SkillsBtn>
      )}
      {goto === "/projects" && (
        <ProjectsBtn>
          <div className="group flex w-fit items-center gap-2 border border-border px-4 py-2 transition-colors hover:border-primary">
            <h2 className="text-base font-semibold text-foreground">{title}</h2>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
          </div>
        </ProjectsBtn>
      )}
      {children}
    </div>
  );
};

export default AddOn;
