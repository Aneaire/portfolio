import { skillList } from "@/constant/fixedText";
import Image from "next/image";

const SkillPage = () => {
  return (
    <div>
      <h1 className=" header-text">Skills and Expertize</h1>
      <div className="flex flex-wrap gap-4">
        {skillList.map((skill) => (
          <div
            key={skill.name}
            className="flex relative flex-col items-center p-4 bg-foreground w-[250px]"
          >
            <Image alt={skill.name} src={skill.icon} width={100} height={100} />
            <h2 className="mt-2 text-xl font-semibold text-center text-gray-800">
              {skill.name}
            </h2>
            <p className="text-center text-sm text-gray-700">{skill.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillPage;
