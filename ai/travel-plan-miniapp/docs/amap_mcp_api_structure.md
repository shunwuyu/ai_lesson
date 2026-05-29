# 高德 MCP Server (amap-sse) 数据结构文档

本文档记录了高德 MCP Server 工具的返回数据结构及能力概览。

> **状态说明**：
> *   ✅ **已验证**：成功调用并获取到真实数据结构。
> *   ⚠️ **连接失败**：尝试调用时返回 `MCP tool invocation failed`，以下展示基于工具定义的参数说明。

## 一、 已验证工具 (Verified)

### 1. 关键字搜索 (Text Search)
**工具名称**: `mcp_amap-sse_maps_text_search`
**功能**: 根据关键字搜索地点（POI）。
**返回结构**:
```json
{
  "suggestion": { "keywords": "", "ciytes": { "suggestion": [] } },
  "pois": [
    {
      "id": "B023B13L9M",
      "name": "杭州西湖风景名胜区",
      "address": "西湖街道龙井路1号",
      "typecode": "110202",
      "photo": "http://store.is.autonavi.com/showpic/..."
    }
  ]
}
```

### 2. 地点详情 (Search Detail)
**工具名称**: `mcp_amap-sse_maps_search_detail`
**功能**: 获取指定 POI ID 的详细信息。
**返回结构**:
```json
{
  "id": "B023B13L9M",
  "name": "杭州西湖风景名胜区",
  "location": "120.121358,30.222692",
  "intro": "...",
  "rating": "4.9",
  "opentime2": "周一至周日 00:00-24:00"
}
```

### 3. 天气查询 (Weather)
**工具名称**: `mcp_amap-sse_maps_weather`
**功能**: 获取指定城市的天气预报。
**返回结构**:
```json
{
  "city": "杭州市",
  "forecasts": [
    {
      "date": "2026-01-11",
      "dayweather": "晴",
      "daytemp": "9",
      "nighttemp": "0"
    }
  ]
}
```

---

## 二、 待验证/连接失败工具 (Connection Failed)

以下工具在当前环境中调用失败（MCP Server 响应异常），无法获取实时返回值。下表根据工具定义列出其**功能**与**请求参数**，供开发参考。

### 路线规划类
| 工具名称 | 功能描述 | 核心参数 |
| :--- | :--- | :--- |
| `mcp_amap-sse_maps_direction_driving` | **驾车**路径规划 | `origin`(起点经纬度), `destination`(终点经纬度) |
| `mcp_amap-sse_maps_direction_walking` | **步行**路径规划 | `origin`, `destination` |
| `mcp_amap-sse_maps_direction_bicycling` | **骑行**路径规划 | `origin`, `destination` |
| `mcp_amap-sse_maps_direction_transit_integrated` | **公交**综合规划 | `origin`, `destination`, `city`(起点城市), `cityd`(终点城市) |

### 地理服务类
| 工具名称 | 功能描述 | 核心参数 |
| :--- | :--- | :--- |
| `mcp_amap-sse_maps_geo` | **地理编码** (地址转坐标) | `address`(结构化地址), `city`(可选) |
| `mcp_amap-sse_maps_regeocode` | **逆地理编码** (坐标转地址) | `location`(经纬度) |
| `mcp_amap-sse_maps_distance` | **距离测量** | `origins`(起点列表), `destination`, `type`(0直线/1驾车/3步行) |
| `mcp_amap-sse_maps_ip_location` | **IP定位** | `ip`(IP地址) |
| `mcp_amap-sse_maps_around_search` | **周边搜索** | `location`(中心点), `keywords`, `radius` |

### Schema 唤起类 (生成 URL)
此类工具通常不返回 JSON 数据，而是返回一个可直接唤起高德地图 App 的 URI 链接。

| 工具名称 | 功能描述 | 核心参数 |
| :--- | :--- | :--- |
| `mcp_amap-sse_maps_schema_navi` | 唤起**导航**页面 | `lat`, `lon` (终点坐标) |
| `mcp_amap-sse_maps_schema_take_taxi` | 唤起**打车**页面 | `slat/slon`(起点), `dlat/dlon`(终点), `dname`(终点名) |
| `mcp_amap-sse_maps_schema_personal_map` | 生成**行程规划地图** | `lineList`(行程点列表), `orgName`(小程序名) |

---

## 三、 总结
当前环境共有 **15** 个高德 MCP 工具可用。
- **已覆盖功能**：基础POI搜索、详情获取、天气查询。
- **暂缺功能**：具体的路线规划数据（驾车/步行等）及地理编码能力。建议在开发小程序时，对于路线规划部分，可暂时使用前端 JS API (`AMap.Driving` 等) 进行替代，或等待 MCP 服务恢复。
