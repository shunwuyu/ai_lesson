import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export function PostTitle({ children }: Props) {
  return (
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left bg-neo-blue text-white border-3 border-black rounded-neo shadow-neo px-6 py-4">
      {children}
    </h1>
  );
}
