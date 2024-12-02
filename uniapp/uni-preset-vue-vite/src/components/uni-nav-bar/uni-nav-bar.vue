<template>
    <view class="uni-navbar">
		<view :class="{ 'uni-navbar--fixed': fixed, 'uni-navbar--shadow': shadow, 'uni-navbar--border': border }" :style="{ 'background-color': backgroundColor }"
		 class="uni-navbar__content">
			<uni-status-bar v-if="statusBar" />
        </view>
    </view>
</template>
<script>
import uniStatusBar from "../uni-status-bar/uni-status-bar.vue";

export default {
    name: "UniNavBar",
    components: {
        uniStatusBar,
    },
    props: {
        fixed: {
            type: [Boolean, String],
			default: false
        },
        shadow: {
            type: [String, Boolean],
            default: false
		},
        border: {
            type: [String, Boolean],
            default: true
		},
        backgroundColor: {
            type: String,
            default: "#FFFFFF"
		},
    }
}
</script>