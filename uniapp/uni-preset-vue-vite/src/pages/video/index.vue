<template>
<view>
    <search ref="search" @close="closeSearch"></search>
</view>
</template>
<script>
import search from '@/components/search.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
export default {
    data() {
        return {
				searchTxt: '周杰伦',
				isShowSearch: true,
        }
    },
    components:{
		uniNavBar,
        search
    },
    methods: {
        goCloud() {
            uni.showToast({
                icon: 'none',
                title: '功能未开发',
			});
        },
        closeSearch() {
            this.isShowSearch = false;
        }
    }
}
</script>
<style lang="scss">
.dpn{
		display: none;
	}
	.top-img {
		width: 50rpx;
		height: 50rpx;
		margin-top: 10rpx;
	}
	.top-search {
		width: 560rpx;
		/* #ifdef MP-WEIXIN */
		width: 460rpx;
		margin-left:-60rpx;
		/* #endif */
		height: 72rpx;
		margin-right: 24rpx;
		border-radius: 72rpx;
		color: #c6c6c6;
		background: #f7f7f7;
		align-items: center;
		justify-content: center;
		.search-icon {
			width: 28rpx;
			height: 29rpx;
			margin-right: 12rpx;
		}
	}
	.topbar {
		.h86 {
			height: 86rpx;
		}
	}

	.scroll-view {
		position: fixed;
		top: 64px;
		width: 100%;
		height: 86rpx;
		white-space: nowrap;
		text-align: center;
		line-height: 86rpx;
		color: #333;
		font-weight: 600;
		border-bottom: 1rpx solid #e6e6e6;
		z-index: 10;
		background: #fff;
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
		.item {
			position: relative;
			display: inline-block;
			min-width: 126rpx;
			height: 86rpx;
			line-height: 86rpx;
			padding: 0 20rpx;
			&.active{
				color:#f32628;
			}
		}
	}

	.slide {
		position: absolute;
		width: 60rpx;
		height: 4rpx;
		left: 0;
		bottom: 0rpx;
		background: #f32628;
		transition: transform 0.3s;
		z-index: 2;
		/* #ifdef MP-WEIXIN */
		bottom: 2rpx;
		/* #endif */
	}

	.video-list {
		color: #333;
		background: #f8f8f8;
		.tit-bar {
			padding-left: 32rpx;
		}
		.video-item {
			padding-top: 32rpx;
			background: #fff;
			border-bottom: 24rpx solid #f8f8f8;
		}

		.video-wrap {
			width: 686rpx;
			margin: 0 auto;
		}

		.img {
			display: block;
			width: 686rpx;
			height: 390rpx;
			border-radius: 10rpx;
			background: #eee;
		}

		.desc {
			font-size: 30rpx;
			font-weight: 600;
			line-height: 84rpx;
			border-bottom: 1rpx solid #e6e6e6;
		}
	}

	.creater-bar {
		height: 100rpx;
		justify-content: space-between;
		align-items: center;
		.avactor-box {
			align-items: center;
		}
		.avactor {
			width: 66rpx;
			height: 66rpx;
			margin-right: 10rpx;
			border-radius: 66rpx;
			background: #eee;
		}

		.name {
			line-height: 100rpx;
		}
	}
</style>