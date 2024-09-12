import { Project } from "@/constant/fixedText";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div key={project.name} className="space-y-2">
      <span className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">{project.name}</h2>
        <span className="font-regular text-sm">({project.nameDesc})</span>
      </span>
      <p className="pb-1 text-sm">{project.desc}</p>
      {project.status === "upcoming" ? (
        <p className="text-orange-400">{project.link}</p>
      ) : (
        <a className="text-blue-400" target="_blank" href={project.link}>
          {project.link}
        </a>
      )}
      <img alt={project.name} src={project.image} />
    </div>
  );
};

export default ProjectCard;