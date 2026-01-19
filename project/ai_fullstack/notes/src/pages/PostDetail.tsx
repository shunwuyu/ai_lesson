import {
  useState
} from 'react';
import { useParams } from 'react-router-dom';
import ArticleHeader from '@/components/ArticleHeader';
import ArticleContent from '@/components/ArticleContent';
import { ArticleData } from '../types';
import { BottomNavbar } from '@/components/BottomNavBar';
 
export default function PostDetail() {
  const { id } = useParams();
  const [isDark, setIsDark] = useState(false);
  console.log(id, '////');
  const mockArticle: ArticleData = {
  title: "五年自学前端到京东终面：我才明白自己不是范进，连范进都不如",
  author: {
    name: "赵小川",
    avatar: "https://picsum.photos/seed/zxc/100/100",
    isFollowing: false,
  },
  metadata: {
    date: "2025-08-04",
    views: "39,034",
    readTime: "4分钟",
  },
  content: [
    {
      type: 'image',
      url: 'https://picsum.photos/seed/mountains/800/450'
    },
    {
      type: 'heading',
      text: '1. 京东终面后，我在群里被恭喜了'
    },
    {
      type: 'paragraph',
      text: '2025年4月，京东HR在BOSS上找我，岗位写的是「iOS开发」，我心想这HR真不专业，但还是回了句：「您好，我是前端，可以面试吗？」'
    },
    {
      type: 'paragraph',
      text: '没想到就这么稀里糊涂面了五轮，终面见部门老大，聊得还行。面完群里几个「未来同事」加我微信，有人说「稳了，等offer吧」，我也觉得这次该轮到我了吧？'
    },
    {
      type: 'paragraph',
      text: '然后，就没有然后了。'
    },
    {
      type: 'paragraph',
      text: 'HR说「流程中」，一等就是一个月。这一个月我啥也没干，就刷邮箱等消息，像个傻子一样。'
    },
    {
      type: 'quote',
      text: '这时候我才懂范进——你以为自己中了，其实屁都没有。'
    },
    {
      type: 'heading',
      text: '2. 我这五年，就是一部「选择比努力重要」的打脸史'
    },
    {
      type: 'paragraph',
      text: '五年自学，我曾经以为只要足够努力，在这个行业总能有一席之地。然而市场的波动、职位的饱和、以及大厂那些令人费解的流程，都在不断消耗着最初的自信。'
    },
    {
      type: 'paragraph',
      text: '现在的环境，已经不是拼努力的时候了，而是拼运气和赛道。'
    }
  ]
};
  const toggleTheme = () => setIsDark(!isDark);

  return (
    <>
      <ArticleHeader 
        title={mockArticle.title}
        author={mockArticle.author}
        metadata={mockArticle.metadata}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
      <ArticleContent sections={mockArticle.content} />
      <BottomNavbar 
        likes={243}
        comments={240}
        authorAvatar={mockArticle.author.avatar}
      />
    </>
  )
}