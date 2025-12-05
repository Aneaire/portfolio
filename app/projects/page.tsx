import Container from "@/components/Common/Container";
import Quote from "@/components/Common/Quote";
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
      {/* GitHub CTA Card */}
      <div className="my-12 flex justify-center">
        <a
          href="https://github.com/Aneaire"
          target="_blank"
          rel="noopener noreferrer"
          className="group block w-full max-w-xl rounded-2xl border-2 border-accent bg-gradient-to-br from-accent/80 to-background p-6 text-center shadow-xl transition hover:scale-105 hover:shadow-2xl"
        >
          <div className="flex flex-col items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mb-2 h-12 w-12 text-black group-hover:text-accent dark:text-white"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.847-2.337 4.695-4.566 4.944.36.31.68.921.68 1.857 0 1.34-.012 2.422-.012 2.753 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-2xl font-bold text-accent-foreground drop-shadow-lg">
              Explore More Projects
            </h3>
            <p className="mb-3 text-base text-muted-foreground">
              Visit my GitHub for more open-source work, experiments, and code
              samples.
            </p>
            <span className="inline-block rounded-lg bg-accent px-6 py-2 text-lg font-semibold text-white shadow transition group-hover:bg-accent-foreground group-hover:text-accent">
              @Aneaire
            </span>
          </div>
        </a>
      </div>
      
      <Quote />
    </Container>
  );
};

export default ProjectsPage;
