// app/page.tsx
export default function Home() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <article className="prose prose-lg prose-blue">
        <h1>这是标题</h1>
        <p>
          这是一段很长的文本。Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nullam nec purus at nunc fringilla ornare. Sed non libero urna.
        </p>
        <h2>二级标题</h2>
        <p>
          另一段文字。Phasellus tincidunt, lorem id ultrices semper, odio nisi fermentum nulla.
        </p>
        <ul>
          <li>列表项 1</li>
          <li>列表项 2</li>
          <li>链接：<a href="#">这是一个链接</a></li>
        </ul>
        <blockquote>
          这是一个引用块，typography 会自动美化它。
        </blockquote>
      </article>
    </div>
  );
}