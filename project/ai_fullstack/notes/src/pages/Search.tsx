import { useEffect, useState } from "react";
import { useSearchStore } from "@/store/search";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { X, Search, ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

/**
* Mobile-friendly Search Page
* - Debounced search
* - Search suggestions
* - Search history (persisted by zustand)
*/
export default function SearchPage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 400);
  const {
    loading,
    suggestions,
    history,
    search,
    addHistory,
    clearHistory,
  } = useSearchStore();


  // 🔍 防抖搜索
  useEffect(() => {
    if (debouncedKeyword.trim()) {
    search(debouncedKeyword);
    }
  }, [debouncedKeyword, search]);


  const handleSearch = (value: string) => {
    setKeyword(value);
    addHistory(value);
  };

  return (
    <div className="p-3 max-w-md mx-auto">
      {/* 搜索框 */}
      <div className="flex items-center gap-2 mb-3">
  <Button size="icon" variant="ghost" onClick={() => navigate(-1)}>
    <ArrowLeft className="w-5 h-5" />
  </Button>

  {/* 输入框容器 */}
  <div className="relative flex-1">
    <Input
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      placeholder="搜索你想要的内容"
      className="pr-9" // 右侧留出图标空间
    />
    {keyword && (
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 p-0"
        onClick={() => setKeyword('')}
        aria-label="清除搜索内容"
      >
        <X className="w-5 h-5" />
      </Button>
    )}
  </div>

  <Button size="icon" variant="ghost" onClick={() => handleSearch(keyword)}>
    <Search className="w-5 h-5" />
  </Button>
</div>
      {!keyword && history.length > 0 && (
      <Card className="mb-3">
        <CardContent className="p-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">搜索历史</span>
          <Button
          variant="ghost"
          size="sm"
          onClick={clearHistory}
          >
          清空
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {history.map((item) => (
            <Button
            key={item}
            variant="secondary"
            size="sm"
            onClick={() => handleSearch(item)}
            >
            {item}
            </Button>
          ))}
        </div>
      </CardContent>
      </Card>
      )}
      {keyword && (
        <Card>
          <CardContent className="p-0">
            <ScrollArea className="h-[60vh]">
              {loading && (
              <div className="p-4 text-center text-sm text-muted-foreground">
              搜索中...
              </div>
              )}
              {!loading && suggestions.length === 0 && (
              <div className="p-4 text-center text-sm text-muted-foreground">
              暂无搜索结果
              </div>
              )}
              {suggestions.map((item: any, index: number) => (
              <div
              key={index}
              className="px-4 py-3 border-b text-sm active:bg-muted"
              onClick={() => handleSearch(item.keyword ?? keyword)}
              >
              {item.keyword ?? item}
              </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
