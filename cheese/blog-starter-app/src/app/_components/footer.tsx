import Container from "@/app/_components/container";

export function Footer() {
  return (
    <footer className="bg-neo-purple border-t-4 border-black">
      <Container>
        <div className="py-12 flex flex-col items-center">
          <h3 className="text-2xl font-extrabold tracking-tighter leading-tight text-center mb-6">
            了解旅梦
          </h3>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/shunwuyu/ai_lesson"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border-3 border-black rounded-neo shadow-neo-sm p-2 hover:shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150"
            >
              <img src="/icons/github.svg" alt="GitHub" className="w-8 h-8" />
            </a>
            <a
              href="https://juejin.cn/user/2664871913601613"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border-3 border-black rounded-neo shadow-neo-sm p-2 hover:shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150"
            >
              <img src="/icons/juejin.svg" alt="掘金" className="w-8 h-8" />
            </a>
            <a
              href="https://leetcode.cn/u/user8312u/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border-3 border-black rounded-neo shadow-neo-sm p-2 hover:shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150"
            >
              <img src="/icons/leetcode.svg" alt="LeetCode" className="w-8 h-8" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
