<!--
 * @LastEditTime: 2019-11-27 15:33:51
 * @Description: 
 * @Date: 2019-11-26 17:07:47
 * @Author: @虾哔哔
 -->
<template>
	<van-tag v-if="isShowTime(time,interval,unitTime)" color="#c9c9c9" text-color="#fff" round>
		{{msgTimeFormat(time)}}
	</van-tag>
</template>

<script>
	let cacheTime = null; //缓存时间
	export default {
		props: {
			time: {
				type: String | Object,
				default: null
			},
			interval: {
				type: Number | String,
				default: 60
			},
			unitTime: {
				type: String,
				default: "second"
				//  * year	年
				//  * month 月
				//  * day	日
				//  * hour	时
				//  * minute	分
				//  * second	秒
				//  * millisecond	毫秒
			}
		},
		data() {
			return {};
		},
		methods: {
			/**
			 * @description: 格式化时间显示格式
			 * @param {String} time:时间
			 * @return: 格式化后的时间
			 */
			msgTimeFormat(time) {
				let dayjs = this.$dayjs;
				const date1 = dayjs(dayjs(new Date()).format("YYYY-MM-DD"));
				const date2 = dayjs(dayjs(time).format("YYYY-MM-DD"));
				let diff = date1.diff(date2, "day");
				if (diff < 1) {
					// 小于一天显示
					return dayjs(time).format("HH:mm");
				} else if (diff >= 1 && diff < 2) {
					// 大于一天小于两天显示
					return dayjs(time).format("昨天 HH:mm");
				} else if (diff >= 2 && diff < 7) {
					// 大于两天小于7天显示
					return dayjs(time).format("dddd HH:mm");
				} else if (diff > 7) {
					// 大于7天
					return dayjs(time).format("YYYY-MM-DD HH:mm");
				}
			},
			/**
			 * @description: 控制是否显示时间
			 * @param {type} time 传入的时间
			 * @param {type} interval 最小间隔显示时间
			 * @param {type} unitTime 时间单位
			 * year	年
			 * month 月
			 * day	日
			 * hour	时
			 * minute	分
			 * second	秒
			 * millisecond	毫秒
			 * @return: {Boolean}
			 */

			isShowTime(time, interval = 60, unitTime = "second") {
				// // debugger;
				if (cacheTime) {
					const date1 = this.$dayjs(time); //传入的时间
					const date2 = this.$dayjs(cacheTime); //缓存时间
					let diff = date1.diff(date2, unitTime); //对比传入的时间与缓存时间的间隔
					// 如果大于设定的时间间隔;
					if (diff >= Number(interval)) {
						cacheTime = time; //重新缓存时间
						return true;
					} else {
						return false;
					}
				} else {
					// 初始化时直接缓存时间
					cacheTime = time;
					return true;
				}
			}
		}
	};
</script>

<style lang="less" scoped>
</style>