import http from "@/utils/http";
export async function useSearchHotDetail() {
    const {data} = await http.get('search/hot/detail')
    return data
}

export async function useSearchSuggest(keywords) {
    const {result} = await http.get('search/suggest', {keywords: keywords})
    return result
}

export async function useBanner() {
    const {banners} = await http.get('/banner', {type: 1})
    return banners
}

export async function usePersonalized() {
    const {result} = await http.get('/personalized')
    return result
}


