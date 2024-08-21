import Container from "@/components/Common/Container";
import { projects } from "@/constant/fixedText";
import ProjectCard from "./ProjectCard";

const ProjectsPage = () => {
  return (
    <Container title="Projects">
      <div className="flex flex-col gap-10">
        {projects.map((project) => (
          <ProjectCard key={project.name + project.link} project={project} />
        ))}
      </div>
    </Container>
  );
};

export default ProjectsPage;
