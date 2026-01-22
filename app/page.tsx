import Container from "@/components/Common/Container";
import SkillCard from "@/components/Common/SkillCard";
import Quote from "@/components/Common/Quote";
import AddOn from "@/components/home/AddOn";
import { homeText, projects, skillList } from "@/constant/fixedText";
import ProjectCard from "./projects/ProjectCard";

// Service card component
const ServiceCard = ({
  service,
  index,
}: {
  service: (typeof homeText.others)[0];
  index: number;
}) => {
  const isHighlighted = index === 0;

  return (
    <div
      className={`group relative ${isHighlighted ? "highlighted-card" : ""}`}
    >
      <div
        className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${
          isHighlighted
            ? "bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 opacity-100"
            : "bg-gradient-to-r from-transparent via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100"
        }`}
      ></div>
      <div
        className={`relative space-y-3 rounded-lg border p-4 transition-all duration-300 ${
          isHighlighted
            ? "border-purple-500/40 bg-gradient-to-br from-purple-500/5 to-blue-500/5 hover:border-purple-500/60"
            : "border-border/30 hover:border-border/60"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`h-2 w-2 rounded-full ${
              isHighlighted
                ? "animate-pulse bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500"
                : "bg-gradient-to-r from-purple-500 to-blue-500"
            }`}
          ></div>
          <h5 className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text font-poppins text-lg font-semibold text-transparent">
            {service.title}
          </h5>
        </div>
        <p className="pl-5 font-mono text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <Container title={homeText.title}>
      <div className="space-y-8">
        {/* Main description */}
        <div className="relative">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-xl"></div>
          <p className="relative rounded-lg border border-border/50 bg-background/50 p-6 font-mono text-base leading-relaxed text-muted-foreground backdrop-blur-sm">
            {homeText.description}
          </p>
        </div>

        {/* Service cards */}
        <div className="space-y-6">
          {homeText.others.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>

      {/* Featured Project section */}
      <section className="mt-4">
        <AddOn goto="/projects" title="Featured Project">
          <ProjectCard project={projects[1]} />
        </AddOn>
      </section>

      {/* Main Frameworks section */}
      <section className="mb-12">
        <AddOn goto="/skills" title="Main Frameworks">
          <div className="skill-card-wrapper pt-1">
            {[
              skillList.find((skill) => skill.name === "TypeScript")!,
              skillList.find((skill) => skill.name === "React")!,
              skillList.find((skill) => skill.name === "N8N")!,
              skillList.find((skill) => skill.name === "React Native")!,
            ].map((skill) => (
              <SkillCard key={skill.name} {...skill} />
            ))}
          </div>
        </AddOn>
      </section>

      {/* Quote section */}
      <Quote />
    </Container>
  );
}
