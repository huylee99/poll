const PageTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <h1 className="text-5xl bg-clip-text text-center font-extrabold text-transparent bg-gradient-to-r from-pink-400 to-red-500 mb-4">
      {title}
    </h1>
  );
};

export default PageTitle;
