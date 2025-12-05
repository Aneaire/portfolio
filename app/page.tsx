import Container from "@/components/Common/Container";
import SkillCard from "@/components/Common/SkillCard";
import Quote from "@/components/Common/Quote";
import AddOn from "@/components/home/AddOn";
import { homeText, projects, skillList } from "@/constant/fixedText";
import ProjectCard from "./projects/ProjectCard";

// Service card component
const ServiceCard = ({ service, index }: { 
  service: typeof homeText.others[0]; 
  index: number; 
}) => (
  <div className="group relative">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="relative space-y-3 p-4 rounded-lg border border-border/30 hover:border-border/60 transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
        <h5 className="font-poppins font-semibold text-lg bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          {service.title}
        </h5>
      </div>
      <p className="font-mono text-sm leading-relaxed text-muted-foreground pl-5">
        {service.description}
      </p>
    </div>
  </div>
);

export default function Home() {
  return (
    <Container title={homeText.title}>
      {/* Main Frameworks section */}
      <section className="mb-12">
        <AddOn goto="/skills" title="Main Frameworks">
          <div className="skill-card-wrapper pt-1">
            {[
              skillList.find(skill => skill.name === "TypeScript")!,
              skillList.find(skill => skill.name === "React")!,
              skillList.find(skill => skill.name === "N8N")!,
              skillList.find(skill => skill.name === "React Native")!
            ].map((skill) => (
              <SkillCard key={skill.name} {...skill} />
            ))}
          </div>
        </AddOn>
      </section>

      <div className="space-y-8">
        {/* Main description */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg blur-xl"></div>
          <p className="font-mono relative leading-relaxed text-base text-muted-foreground bg-background/50 backdrop-blur-sm rounded-lg p-6 border border-border/50">
            {homeText.description}
          </p>
        </div>
        
        {/* Service cards */}
        <div className="space-y-6">
          {homeText.others.map((service, index) => (
            <ServiceCard 
              key={service.title} 
              service={service} 
              index={index} 
            />
          ))}
        </div>
      </div>
      
      {/* Featured Project section */}
      <section className="mt-4">
        <AddOn goto="/projects" title="Featured Project">
          <ProjectCard project={projects[1]} />
        </AddOn>
      </section>
      
      {/* Quote section */}
      <Quote />
    </Container>
  );
}
