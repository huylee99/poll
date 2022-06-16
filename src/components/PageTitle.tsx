import Link from "next/link";

const PageTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Link passHref href={"/"}>
      <h1 className="text-5xl bg-clip-text text-center font-extrabold text-transparent bg-gradient-to-r from-pink-400 to-red-500 mb-8">
        {title}
      </h1>
    </Link>
  );
};

export default PageTitle;
