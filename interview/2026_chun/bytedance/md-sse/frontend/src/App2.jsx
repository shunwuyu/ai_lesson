import { Streamdown }  from "streamdown";

export default function App() {
  const markdown = "# Hello World\n\nThis is **streaming** markdown!";
  
  return (
    <Streamdown>
      {markdown}
    </Streamdown>
  );
}