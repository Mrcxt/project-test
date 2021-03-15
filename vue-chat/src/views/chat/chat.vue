<template>
	<div class="chat">
		<div class="container">
			<!-- main -->
			<div class="main">
				<div class="msg__groups" ref="ref_scroll">
					<ul class="">
						<template v-for="(item, index) in msgLists">
							<!-- tips -->
							<li v-if="item.type && item.type === 'tips'">
								<van-tag color="#bebebe" text-color="#fff" round>
									{{ item.msg }}
								</van-tag>
							</li>
							<!-- 对话 -->
							<template v-else-if="!item.type">
								<!-- time -->
								<li>
									<MsgTime :time="item.log.msg_time" />
								</li>
								<!-- msg__box -->
								<li class="msg__box" :data-rule="item.log.user_type">
									<div class="msg__box-avatar">
										<van-image v-if="item.log.user_type" round width="40" height="40" :src="item.avatar" />
										<van-image v-else round width="40" height="40" :src="require('../../assets/image/user.png')" />
									</div>
									<div class="msg__box-info" :style="{ flexGrow: Number(!!item.prompts) }">
										<template v-if="!(item.log.source === 6)">

											<!-- msg -->
											<div v-if="!item.common_questions" v-html="item.msg"></div>
											<!-- 选项卡1 -->
											<div class="prompts" v-if="item.prompts && item.prompts.length > 0">
												<van-divider> 选择其中一项 </van-divider>
												<van-row gutter="20">
													<van-col class=" tool-my5" v-for="(item, index) in item.prompts" :key="index" span="12">
														<van-button class="van-ellipsis" type="info" size="small" plain hairline round block @click="wsSend(item.text)">
															{{ item.button }}
														</van-button>
													</van-col>
												</van-row>
											</div>
											<!-- 选项卡2 -->
											<!-- 选项卡3 -->
											<!-- 关联问题 -->
											<div v-if="item.relevant_list && item.relevant_list.length > 0">
												<van-divider>
													{{ item.relation_guide_language }}
												</van-divider>
												<ul>
													<li class="tool-fontsize14 tool-color-primary" v-for="(item, index) in item.relevant_list" :key="index" @click="wsSend(item)">
														<template v-if="item">
															{{ index + 1 }}、{{ item }}
														</template>
													</li>
												</ul>
											</div>
											<!-- 常见问题 -->
											<ol v-if="!!item.common_questions">
												<li class="tool-fontsize14 tool-color-primary" v-for="(item, index) in item.common_questions" :key="index" @click="wsSend(item)">
													{{ index + 1 }}、{{ item }}
												</li>
											</ol>
										</template>
										<!--相似问法推荐-->
										<div v-if="
                        item.log &&
                          item.log.source &&
                          item.log.source === 6 &&
                          item.q_list_std &&
                          item.q_list_std.length > 0
                      ">
											<van-divider>
												{{ item.similar_guide_language }}
											</van-divider>
											<ul>
												<li class="tool-fontsize14 tool-color-primary" v-for="(item, index) in item.q_list_std" :key="index" @click="wsSend(item)">
													<template v-if="item">{{ index + 1 }}、{{ item }}</template>
												</li>
											</ul>
										</div>
										<!--是否有用-->
										<!-- <div class="feedback" v-if="enable_is_useful&&item.log.user_type===1&&item.log.source===1">
                    <i class="iconfont icon-x-thumb-up fine" :class="{'green':item.isfeedback==='green'}" @click="useful(item)">有用</i>
                    <i class="iconfont icon-x-thumb-down bad" :class="{'dark':item.isfeedback==='dark'}" @click="unuseful(item)">没用</i>
                  </div> -->
									</div>
								</li>
							</template>
						</template>
					</ul>
				</div>
				<transition name="fade">
					<div class="unreadmsg" v-if="unreadMsg" @click="scrollToBottom">
						{{ unreadMsg }}条新消息
					</div>
				</transition>
			</div>
			<!--  -->
			<div class="hotquestion__group">
				<ul>
					<li v-if="enable_common" @click="wsSend('##常见问题##')">常见问题</li>
					<!-- 常驻任务 -->
					<template v-if="enable_bottom_flow">
						<li v-for="(item, index) in bottom_flows" :key="index" @click="wsSend(Object.values(item)[0])">
							{{ Object.keys(item)[0] }}
						</li>
					</template>
					<!-- 热门问题 -->
					<template v-if="enable_bottom_hotqs">
						<li v-for="(item, index) in hot_questions" :key="index" @click="wsSend(item)">
							{{ item }}
						</li>
					</template>
				</ul>
			</div>
			<!-- footer -->
			<div class="footer">
				<!--  -->
				<div class="keyquestion__group" v-if="keyword_question.length > 0">
					<ul>
						<li v-for="(item, index) in keyword_question" :key="index" @click="wsSend(item)">
							<van-cell-group>
								<van-cell>
									<div class="van-ellipsis">{{ item }}</div>
								</van-cell>
							</van-cell-group>
						</li>
					</ul>
				</div>

				<van-field v-model="input_msg" placeholder="请输入" />
				<van-button type="info" size="small" plain hairline round @click="wsSend()">
					发送
				</van-button>
			</div>
		</div>
	</div>
</template>

<script>
	import { urlsWebSocketBot } from "@/api/config";
	import testdata from "@/test/imdata";
	import MsgTime from "./components/msgTime";

	export default {
		name: "",
		components: {
			MsgTime
		},
		data() {
			return {
				msgLists: testdata,
				// msgLists: [], //消息列表
				unreadMsg: 0, //未读消息数
				Socket: null,
				input_msg: "",
				enable_common: 0, // 常见问题
				enable_bottom_flow: 0, // 开启底部常驻任务
				bottom_flows: [], //
				enable_bottom_hotqs: 0, //开启底部热门问题
				hot_questions: 0, //
				firstMessage: true,
				cate_ids: [],
				keyword_question: []
			};
		},
		computed: {
			botid() {
				// let botid = "6812fe258cf84a12a3380fe30c80f1af"; //外网
				let botid = "501f522a99184b789b8e81d504380860"; //内网
				return process.env.NODE_ENV === "development"
					? botid
					: this.$route.query.botid;
			},
			uuid() {
				return this.$uuid();
			}
		},
		filters: {},
		watch: {
			msgLists() {
				let ref_scroll = this.$refs.ref_scroll;

				if (
					ref_scroll.scrollTop + ref_scroll.clientHeight ===
					ref_scroll.scrollHeight
				) {
					this.scrollToBottom();
				}
			},
			//
			input_msg: _.debounce(function(val) {
				this.GetInputSuggest(val);
			}, 200)
		},
		mounted() {
			console.log(process.env);
			this.init();
			this.$refs.ref_scroll.addEventListener(
				"scroll",
				_.debounce(this.isScrollBottom, 200)
			);
		},
		methods: {
			init() {
				this.initSocket();
				this.GetKbCatesIds();
			},

			/*----------  websocket  ----------*/

			initSocket() {
				let url = `${urlsWebSocketBot}/ws?sid=${this.uuid}&botid=${this.botid}`;
				this.Socket = new WebSocket(url);
				//
				this.Socket.onopen = e => {
					this.wsOnOpen(e);
				};
				this.Socket.onmessage = res => {
					this.wsOnMessage(res);
				};
				this.Socket.onerror = err => {
					this.wsOnError(err);
				};
				this.Socket.onclose = res => {
					this.wsOnClose(res);
				};
			},
			/* 事件 */
			wsOnOpen(e) {
				let data = {
					type: "tips",
					msg: "机器人上线了"
				};
				this.msgListsPush(data);
			},
			wsOnMessage(res) {
				let data = JSON.parse(res.data);

				//
				if (this.firstMessage) {
					// 常见问题
					this.enable_common = data.enable_common;
					// 开启底部常驻任务
					this.enable_bottom_flow = data.enable_bottom_flow;
					this.bottom_flows = data.bottom_flows;

					// 开启底部热门问题
					this.enable_bottom_hotqs = data.enable_bottom_hotqs;
					this.hot_questions = data.hot_questions;

					this.firstMessage = false;
				}

				if (!data.log) {
					data.log = {
						user_type: 1, //用户类型,0为访客，1为bot，2为座席
						msg_time: this.$dayjs()
					};
				}
				this.msgListsPush(data, false);
				let ref_scroll = this.$refs.ref_scroll;
				if (
					ref_scroll.scrollTop + ref_scroll.clientHeight !==
					ref_scroll.scrollHeight
				) {
					this.unreadMsg++;
				}
			},
			wsOnError(err) {},
			wsOnClose(res) {
				let data = {
					type: "tips",
					msg: "机器人下线了"
				};
				this.msgListsPush(data);
			},

			/* 方法 */
			wsSend(text) {
				text = this.$xss(text || this.input_msg);

				if (text != "") {
					// if (this.Socket.readyState === 1) {
					// 	this.Socket.send(text);

					// 	let data = {
					// 		msg: text,
					// 		log: {
					// 			user_type: 0, //用户类型,0为访客，1为bot，2为座席
					// 			msg_type: 0, //消息类型,0为文本，1为其他
					// 			msg_time: this.$dayjs()
					// 		}
					// 	};
					// 	this.msgListsPush(data);

					// 	this.input_msg = "";
					// } else {
					// 	this.initSocket();
					// }

					let data = {
							msg: text,
							log: {
								user_type: 0, //用户类型,0为访客，1为bot，2为座席
								msg_type: 0, //消息类型,0为文本，1为其他
								msg_time: this.$dayjs()
							}
						};
						this.msgListsPush(data);

						this.input_msg = "";
				}
			},
			wsClose() {
				this.Socket.close();
			},

			/*=====  End of websocket  ======*/

			/*----------  api  ----------*/

			// 获取机器人所有知识点分类id
			GetKbCatesIds() {
				this.$request.GetKbCatesIds(this.botid).then(res => {
					if (res.status === 200) {
						this.cate_ids = res.data.cate_ids;
					}
				});
			},
			//聊天框输入时 获取知识点推荐
			GetInputSuggest(val) {
				if (val) {
					let params = {
						bot_id: this.botid,
						keyword: val,
						cate_ids: this.cate_ids
					};
					this.$request.GetInputSuggest(params).then(res => {
						if (res.status === 200) {
							this.keyword_question = res.data.keyword_question;
						}
					});
				} else {
					this.keyword_question = [];
				}
			},

			/*=====  End of api  ======*/

			/*----------  平缓下拉动画  ----------*/
			//
			scrollTop(el, from = 0, to, duration = 500) {
				if (!window.requestAnimationFrame) {
					window.requestAnimationFrame =
						window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame ||
						window.msRequestAnimationFrame ||
						function(callback) {
							return window.setTimeout(callback, 1000 / 60);
						};
				}
				const difference = Math.abs(from - to);
				const step = Math.ceil((difference / duration) * 50);

				function scroll(start, end, step) {
					if (start === end) return;

					let d = start + step > end ? end : start + step;
					if (start > end) {
						d = start - step < end ? end : start - step;
					}

					if (el === window) {
						window.scrollTo(d, d);
					} else {
						el.scrollTop = d;
					}
					window.requestAnimationFrame(() => scroll(d, end, step));
				}
				scroll(from, to, step);
			},
			//
			scrollToBottom() {
				let ref_scroll = this.$refs.ref_scroll;
				// console.log(
				//   ref_scroll.scrollTop,
				//   ref_scroll.clientHeight,
				//   ref_scroll.scrollHeight
				// );
				if (ref_scroll.scrollTop != ref_scroll.scrollHeight) {
					this.scrollTop(
						this.$refs.ref_scroll,
						ref_scroll.scrollTop,
						ref_scroll.scrollHeight,
						1000
					);
				}
			},
			/*=============================================*/

			/*----------  utils  ----------*/
			/**
			 * @description:
			 * @param {Object} data
			 * @param {Boolean} isScroll:是否下拉窗体
			 * @return: {void}
			 */

			msgListsPush(data, isScroll = true) {
				this.msgLists.push(data);
				if (isScroll) {
					this.scrollToBottom();
				}
			},
			/**
			 * @description:判断对话窗体是否处于底部
			 * @param
			 * @return: {void}
			 */
			isScrollBottom() {
				let ref_scroll = this.$refs.ref_scroll;

				if (
					ref_scroll.scrollTop + ref_scroll.clientHeight ===
					ref_scroll.scrollHeight
				) {
					this.unreadMsg = 0;
				}
			}

			/*=====  End of utils  ======*/
		}
	};
</script>

<style lang="less" scoped src="./chat.less"></style>
<style>
</style>