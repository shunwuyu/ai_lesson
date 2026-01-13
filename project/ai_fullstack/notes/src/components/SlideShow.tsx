import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

export interface SlideData {
  id: number | string;
  image?: string; // 可选：如果是图片轮播
  content?: React.ReactNode; // 可选：如果是自定义内容
  title?: string;
}

interface SlideshowProps {
  slides: SlideData[];
  autoPlayDelay?: number; // 自动播放间隔，默认 3000ms
  className?: string;
}

export default function Slideshow({ 
  slides, 
  autoPlayDelay = 3000, 
  className 
}: SlideshowProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  // 配置自动播放插件
  const plugin = React.useRef(
    Autoplay({ delay: autoPlayDelay, stopOnInteraction: true })
  )

  // 监听 Carousel 状态变化（用于更新底部指示点）
  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className={cn("relative w-full", className)}>
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          loop: true, // 开启无限循环
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id || index}>
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border bg-muted">
                {/* 如果有图片，显示图片 */}
                {slide.image ? (
                  <img
                    src={slide.image}
                    alt={slide.title || "slide"}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  /* 如果没有图片，显示自定义内容或占位符 */
                  <div className="flex h-full items-center justify-center p-6">
                    {slide.content || <span className="text-2xl font-semibold">{slide.title}</span>}
                  </div>
                )}
                
                {/* 标题遮罩 (可选) */}
                {slide.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                    <h3 className="text-lg font-bold">{slide.title}</h3>
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* 底部指示点 (Dots) */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-300",
              current === index 
                ? "bg-white w-6" // 选中状态：白色长条
                : "bg-white/50 hover:bg-white/80" // 未选中状态：半透明圆点
            )}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}