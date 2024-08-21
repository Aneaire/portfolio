import { ISKillList } from "@/constant/fixedText";

const SkillCard = (skill: ISKillList) => {
  return (
    <a
      href={skill.link}
      target="_blank"
      rel="noopener noreferrer"
      key={skill.name}
      className="relative flex flex-grow flex-col items-center rounded bg-foreground p-4 transition hover:rotate-1 hover:scale-105 sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1rem)] lg:w-[250px]"
    >
      <img alt={skill.alt} src={skill.icon} className="size-24 rounded" />
      <h2 className="mt-2 text-center text-xl font-semibold text-gray-800">
        {skill.name}
      </h2>
      <p className="text-center text-sm text-gray-700">{skill.desc}</p>
    </a>
  );
};

export default SkillCard;
