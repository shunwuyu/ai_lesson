import { CMS_NAME } from "@/lib/constants";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter leading-tight md:pr-8 bg-neo-yellow border-3 border-black rounded-neo shadow-neo px-6 py-4">
        Blog.
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8 font-bold">
        AI Native Coder
      </h4>
    </section>
  );
}
