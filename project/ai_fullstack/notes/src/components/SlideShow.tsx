// components/Slideshow.tsx
import { useRef, useState, useEffect } from "react";
// Autoplay 是 embla-carousel-autoplay 提供的一个插件，
// 用于为 Embla Carousel 轮播组件添加自动播放功能。
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,// 轮播图组件，显示、自动切换、分页等功能
  CarouselContent, // 负责展示实际的轮播内容
  CarouselItem, // CarouselItem 是每个单独的轮播项
  type CarouselApi, // 通过这个 API，你可以访问和控制轮播图的一些行为，如跳转到特定的轮播项、启动或停止自动播放等
} from "@/components/ui/carousel";

export interface SlideData {
  id: number | string; // 唯一标识符
  image: string; // 图片URL
  title?: string; // 可选标题
}

interface SlideshowProps {
  slides: SlideData[]; // 支持包含id, image, title的slides数组
  autoPlay?: boolean;
  autoPlayDelay?: number;
}

export default function Slideshow({
  slides,
  autoPlay = true,
  autoPlayDelay = 3000, // 自动播放延迟时间，单位毫秒
}: SlideshowProps) {
  // 持久化跨渲染的可变引用对象
  // useRef 创建一个持久且不可变的插件实例
  const plugin = useRef(
    autoPlay ? Autoplay({ delay: autoPlayDelay, stopOnInteraction: true }) : null
  );
  // 轮播组件会在就绪后调用 setApi 传入真实的 API 对象
  // 轮播图给我们操纵的api 
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 监听 Carousel 状态变化（用于更新底部指示点）
  useEffect(() => {
    if (!api) return;
    // 立即读取当前激活的轮播项索引（即第几张），并设为初始选中状态，用于高亮底部指示点。
    setSelectedIndex(api.selectedScrollSnap()); // 初始化选中索引
    // 当轮播图发生切换（如自动播放、手动滑动、点击指示点）时，重新获取最新选中索引并更新状态。
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect); // 组件卸载时移除事件监听
    };
  }, [api]); // 依赖项数组包含 api，确保在 api 变化时重新运行

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        plugins={plugin.current ? [plugin.current] : []}
        opts={{ loop: true }}
        onMouseEnter={() => plugin.current?.stop()}
        onMouseLeave={() => plugin.current?.reset()}
        className="w-full"
      >
        <CarouselContent>
          {slides.map(({ id, image, title }, index) => (
            <CarouselItem key={id}>
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden">
                <img
                  src={image}
                  alt={title || `slide ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                {title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                    <h3 className="text-lg font-bold">{title}</h3>
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* 指示点 */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`h-2 w-2 rounded-full transition-all ${
              selectedIndex === i ? "bg-white w-6" : "bg-white/50"
            }`}
            onClick={() => api?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}