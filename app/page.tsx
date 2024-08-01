import { homeText } from "@/constant/fixedText";

export default function Home() {
  return (
    <main className=" relative py-5 px-2 max-w-4xl">
      <h1 className=" font-poppins text-3xl tracking-wider font-bold">
        {homeText.title}
      </h1>
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
