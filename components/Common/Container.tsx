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
      <h1 className="header-text text-gradient pb-6">{title}</h1>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Container;
