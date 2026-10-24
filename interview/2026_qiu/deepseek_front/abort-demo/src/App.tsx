import { useState, useEffect, useRef } from 'react';

// ========= 【你原版函数，一字未改】 =========
async function fetchWithTimeout<T>(
  url: string,
  timeoutMs: number,
): Promise<T> {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json() as T;
  } finally {
    clearTimeout(timer);
  }
}
// ==========================================

interface WeatherResult {
  city: string;
  temperature: number;
}

/**
 * 模拟后端接口：内部 await 等待10s，返回天气数据
 * 这里就是你想要的「接口里面await 10000ms」
 */
async function mockWeatherApi(signal: AbortSignal): Promise<WeatherResult> {
  // 等待10秒
  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, 10000);
    signal.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new DOMException('aborted', 'AbortError'));
    });
  });
  return {
    city: '北京',
    temperature: 24
  };
}

export default function WeatherDemo() {
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherResult | null>(null);
  const [errMsg, setErrMsg] = useState('');
  const abortRef = useRef<AbortController | null>(null);

  const queryWeather = async () => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    setLoading(true);
    setErrMsg('');
    setWeather(null);

    try {
      // 这里直接调用模拟接口，不再走真实fetch请求
      const data = await mockWeatherApi(ac.signal);
      setWeather(data);
    } catch (e: any) {
      if (e.name === 'AbortError') {
        setErrMsg('超时/手动取消：5s超时，mock接口需要10s才返回');
      } else {
        setErrMsg(`错误：${e.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const cancel = () => {
    abortRef.current?.abort();
  };

  // 组件卸载自动取消
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h3>纯JS模拟慢接口｜内部await 10s，超时5s</h3>
      <button onClick={queryWeather} disabled={loading}>
        {loading ? '请求中...' : '查询天气'}
      </button>
      <button onClick={cancel} disabled={!loading} style={{ marginLeft: 8 }}>
        手动取消
      </button>
      <div style={{ color: 'red', margin: '12px 0' }}>{errMsg}</div>
      {weather && (
        <div>
          <p>城市：{weather.city}</p>
          <p>温度：{weather.temperature} ℃</p>
        </div>
      )}
    </div>
  );
}
