import React from "react";
import ProjectsBtn from "../button_links/ProjectsBtn";
import SkillsBtn from "../button_links/SkillsBtn";

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
          <div className="group flex items-center gap-2 w-fit px-4 py-2 rounded-lg border border-border/50 bg-gradient-to-r from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20 transition-all duration-300 hover:scale-105">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {title}
            </h2>
            <svg 
              className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-all duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </SkillsBtn>
      )}
      {goto === "/projects" && (
        <ProjectsBtn>
          <div className="group flex items-center gap-2 w-fit px-4 py-2 rounded-lg border border-border/50 bg-gradient-to-r from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20 transition-all duration-300 hover:scale-105">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {title}
            </h2>
            <svg 
              className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-all duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </ProjectsBtn>
      )}
      {children}
    </div>
  );
};

export default AddOn;
