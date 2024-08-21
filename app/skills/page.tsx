import Container from "@/components/Common/Container";
import SkillCard from "@/components/Common/SkillCard";
import { skillList } from "@/constant/fixedText";
import { memo } from "react";

const SkillPage = () => {
  return (
    <Container title="Skills and Expertize">
      <p className="mt-2 font-mono text-lg">
        I am adept at adopting new technologies and tools, whether for web or
        mobile applications. My adaptability ensures that I can quickly get up
        to speed with whatever is required to deliver exceptional results. I’m
        always willing to put in the hard work needed to learn new skills, so if
        there’s something specific you need me to master, I’ll do whatever it
        takes to get the job done.
      </p>
      <div className="skill-card-wrapper pt-7">
        {skillList.map((skill) => (
          <SkillCard key={skill.name} {...skill} />
        ))}
      </div>
    </Container>
  );
};

export default memo(SkillPage);
