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
          <h2 className="w-fit text-xl font-semibold underline underline-offset-4">
            {title}
          </h2>
        </SkillsBtn>
      )}
      {goto === "/projects" && (
        <ProjectsBtn>
          <h2 className="w-fit text-xl font-semibold underline underline-offset-4">
            {title}
          </h2>
        </ProjectsBtn>
      )}
      {children}
    </div>
  );
};

export default AddOn;
