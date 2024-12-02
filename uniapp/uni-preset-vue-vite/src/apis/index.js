/* apis/index.js */
import request from '@/utils/request/index.js'
export function apiGetBanner(data) {
    return request.request({
        url: '/banner',
        method: 'GET',
        data: data,
        authType: 'None'
    })
}

export function apiGetRecommendSongs(data) {
    return request.request({
		url: '/personalized',
		method: 'GET',
		data,
		authType: 'None'
	})
}

export function apiGetTopAlbum(data) {
    return request.request({
		url: '/album/newest',
		method: 'GET',
		data,
		authType: 'None'
	})
}

export function apiGetRelatedVideo(data) {
	return request.request({
		url: '/related/allvideo',
		method: 'GET',
		data,
		authType: 'None'
	})
}

export function apiGetHotList(data) {
	return request.request({
		url: '/top/playlist',
		method: 'GET',
		data,
		authType: 'None'
	})
}