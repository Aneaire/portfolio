import { homeText } from "@/constant/fixedText";

export default function Home() {
  return (
    <main className=" relative px-2 max-w-4xl">
      <h1 className=" header-text">{homeText.title}</h1>
      <div className="space-y-5 pt-4">
        <p className=" font-mono">{homeText.description}</p>
        {homeText.others.map((text) => (
          <div className=" space-y-1">
            <h5 className=" font-medium font-poppins">~ {text.title}</h5>{" "}
            <p className=" text-sm font-mono">{text.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
