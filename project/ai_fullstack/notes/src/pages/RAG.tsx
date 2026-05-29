import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useRagStore } from '@/store/rag';
import Header from '@/components/Header';

const RAG:React.FC = () => {
  const { question, answer, setQuestion, retrieve } = useRagStore();

  const ask = async () => {
    // console.log('//////');
    await retrieve();
  };

  return (
    <>
      <Header title="RAG助手" showBackBtn={true} />
      <div className="max-w-xl mx-auto mt-10 space-y-4 p-4">
        <Textarea
          placeholder="请输入你的问题，例如：什么是 RAG？"
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
        <Button onClick={ask}>提问</Button>
        {answer && (
          <Card>
            <CardContent className="p-4 whitespace-pre-wrap">
              {answer}
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}

export default RAG