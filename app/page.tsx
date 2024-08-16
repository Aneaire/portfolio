import { homeText } from "@/constant/fixedText";

export default function Home() {
  return (
    <main className="relative max-w-4xl px-2">
      <h1 className="header-text">{homeText.title}</h1>
      <div className="space-y-5 pt-4">
        <p className="font-mono">{homeText.description}</p>
        {homeText.others.map((text) => (
          <div className="space-y-1">
            <h5 className="font-poppins font-medium">~ {text.title}</h5>{" "}
            <p className="font-mono text-sm">{text.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
