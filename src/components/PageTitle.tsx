import Link from "next/link";

const PageTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <h1 className="text-5xl bg-clip-text text-center font-extrabold text-transparent bg-gradient-to-r from-pink-400 to-red-500 mb-8">
      <Link passHref href={"/"}>
        <span className="cursor-pointer">{title}</span>
      </Link>
    </h1>
  );
};

export default PageTitle;
