import Container from "@/components/Common/Container";
import SkillCard from "@/components/Common/SkillCard";
import AddOn from "@/components/home/AddOn";
import { homeText, projects, skillList } from "@/constant/fixedText";
import ProjectCard from "./projects/ProjectCard";

export default function Home() {
  return (
    <Container title={homeText.title}>
      <div className="space-y-5">
        <p className="font-mono">{homeText.description}</p>
        {homeText.others.map((text) => (
          <div key={text.title} className="space-y-1">
            <h5 className="font-poppins font-medium">~ {text.title}</h5>{" "}
            <p className="font-mono text-sm">{text.description}</p>
          </div>
        ))}
      </div>
      <AddOn goto="/skills" title="Main Frameworks">
        <div className="skill-card-wrapper pt-1">
          {skillList.slice(0, 4).map((skill) => (
            <SkillCard key={skill.name} {...skill} />
          ))}
        </div>
      </AddOn>
      <AddOn goto="/projects" title="Main Frameworks">
        <ProjectCard project={projects[2]} />
      </AddOn>
    </Container>
  );
}
