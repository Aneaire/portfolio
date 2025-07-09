import { Project } from "@/constant/fixedText";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div key={project.name} className="space-y-2">
      <span className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">{project.name}</h2>
        <span className="font-regular text-sm">({project.nameDesc})</span>
      </span>
      <p className="pb-1 text-sm">{project.desc}</p>
      <a
        className={
          project.status === "upcoming"
            ? "text-orange-400 underline"
            : "text-blue-400 underline"
        }
        target="_blank"
        rel="noopener noreferrer"
        href={project.link}
      >
        {project.link}
      </a>
      <img alt={project.name} src={project.image} />
    </div>
  );
};

export default ProjectCard;
