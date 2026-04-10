import { cn } from "@/lib/utils";

const Container = ({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("mt-2 w-full max-w-5xl animate-fade-in-up", className)}>
      <div className="pb-6">
        <p className="section-label mb-2">Portfolio</p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        <div className="mt-3 h-px w-12 bg-primary" />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Container;
