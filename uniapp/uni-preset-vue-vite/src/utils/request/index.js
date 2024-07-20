import Request from './request.js'

// need to change baseUrl
const baseUrl = process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "http://122.51.183.19"

const config = {
	baseUrl: baseUrl
}

const reqInterceptor = async (options) => {
	uni.showLoading({
	    title: '加载中...'
	});
	//TODO do your request interceptor, such as url/header config, token refresh...
	_requestLog(options, "成功通过")
	// return false will abort the request, and then reject a blank object {}
	return options
}

const resInterceptor = (response, conf = {}) => {
	uni.hideLoading();
	// TODO do your response
	const statusCode = response.statusCode
	// response interceptor
	if (statusCode >= 200 && statusCode < 300) { //成功
		_responseLog(response, conf, "response 200-299")
		return response.data
	} else if (statusCode === 500) {
		console.log('statusCode：'+ statusCode)
		uni.showToast({
			icon: 'none',
		    title: '服务器错误'
		});
		_responseLog(response, conf, "response 500")
		// 为了对reject的内容更加可控，我们增加了一个控制字段 wakaryReqToReject
		return {
			// 根据当前字段来判断是否reject
			wakaryReqToReject: true,
			// 下面可以配置您的其它返回信息，方便您更加统一的处理reject的内容。
			// 以下内容会被作为reject的返回，根据您的需要处理，比如返回您的具体错误信息
			msg: "服务器错误",
			res: response
		}
	} else {
		uni.showToast({
			icon: 'none',
		    title: '服务器异常'
		});
		_responseLog(response, conf, "response 300-499")
		// 为了对reject的内容更加可控，我们增加了一个控制字段 wakaryReqToReject
		return {
			// 根据当前字段来判断是否reject
			wakaryReqToReject: true,
			// 下面可以配置您的其它返回信息，方便您更加统一的处理reject的内容。
			// 以下内容会被作为reject的返回，根据您的需要处理，比如返回您的具体错误信息
			msg: "这里是提示信息",
			res: response
		}
	}
}

const req = new Request(config, reqInterceptor, resInterceptor)

// request log
function _requestLog(req, describe = null) {
	if (process.env.NODE_ENV === 'development') {
		// console.log("request地址：" + req.url)
		// if (describe) {
		// 	console.log("request描述：" + describe)
		// }
		// console.log("request详细：" + JSON.stringify(req))
	}
	//TODO into log server
}

// response log
function _responseLog(res, conf = {}, describe = null) {
	let _statusCode = res.statusCode;
	if (process.env.NODE_ENV === 'development') {
		// console.log("response地址: " + conf.url)
		// if (describe) {
		// 	console.log("response描述：" + describe)
		// }
	}
	//TODO into log server
	if (_statusCode === 500) {
		// 
	}
}

export default req
