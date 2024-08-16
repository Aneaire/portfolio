import { skillList } from "@/constant/fixedText";

const SkillPage = () => {
  return (
    <div>
      <h1 className="header-text">Skills and Expertize</h1>
      <p className="mt-2 max-w-4xl font-mono text-lg">
        I am adept at adopting new technologies and tools, whether for web or
        mobile applications. My adaptability ensures that I can quickly get up
        to speed with whatever is required to deliver exceptional results. I’m
        always willing to put in the hard work needed to learn new skills, so if
        there’s something specific you need me to master, I’ll do whatever it
        takes to get the job done.
      </p>
      <div className="flex max-w-7xl flex-wrap gap-4 pt-7">
        {skillList.map((skill) => (
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
        ))}
      </div>
    </div>
  );
};

export default SkillPage;
