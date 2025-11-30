import Container from "@/components/Common/Container";
import SkillCard from "@/components/Common/SkillCard";
import { skillList } from "@/constant/fixedText";
import { memo } from "react";

const SkillPage = () => {
  return (
<Container title="Skills and Expertise">
      <p className="mt-2 font-mono text-lg">
        As a Software Developer specializing in AI Automation and Data Engineering,
        I combine strong engineering fundamentals with cutting-edge automation and
        data processing tools to build solutions that drive business efficiency.
        My expertise spans full-stack development, workflow automation, AI-enhanced
        development practices, and scalable data pipeline architecture. I leverage
        modern frameworks, AI tools, and data engineering technologies to deliver
        robust applications 40-60% faster while maintaining exceptional quality and
        reducing operational costs for businesses.
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
