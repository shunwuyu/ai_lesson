import Link from "next/link";

const Header = () => {
  return (
    <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8 flex items-center">
      <Link href="/" className="hover:bg-neo-blue hover:text-white px-2 py-1 rounded-neo transition-colors duration-150">
        Blog
      </Link>
      .
    </h2>
  );
};

export default Header;
