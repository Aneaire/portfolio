const Container = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="mt-2 w-full max-w-5xl">
      <h1 className="header-text pb-4">{title}</h1>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Container;
