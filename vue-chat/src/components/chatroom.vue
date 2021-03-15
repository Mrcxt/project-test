<template>
  <div class="chatroom">
    <div class="working">
      <div class="chat">
        <!--body-->
        <div class="body chatContent" ref="chatContent" id="chatContent">
          <template v-for="(item, index) in msgLists">
            <!--上下线提示-->
            <p class="onoffline" v-if="item.type==='tips'" :key="index">{{item.msg}}</p>
            <!--正式消息队列-->
            <li v-if="!item.type" class="dialog clearfix" :class="item.log.user_type===0?'user':'robot'" :key="index">
              <p class="time" v-if="item.log.msg_time">{{item.log.msg_time}}</p>
              <div class="msg">
                <img class="avatar" v-if="item.log.user_type===2" src="../assets/images/kefu.png" alt="人工坐席">
                <img class="avatar" v-else-if="item.log.user_type===1&&webChannelForm.window_logo" :src="webChannelForm.window_logo" alt="机器人">
                <img class="avatar" v-else-if="item.log.user_type===1&&!webChannelForm.window_logo" src="../assets/images/robotAvatar6.png" alt="机器人">
                <img class="avatar" v-else src="../assets/images/user.png" alt="用户">
                <!--若为机器人 背景色改变-->
                <div class="text" :style="item.log.user_type===0&&textStyleObj">
                  <!--纯文本消息-->
                  <p v-html="item.msg"></p>
                  <!--是否有用-->
                  <div class="feedback" v-if="item.log.user_type===1&&item.log.source===1">
                    <i class="iconfont icon-ali-thumb-up fine" :class="{'green':item.isfeedback==='green'}" @click="useful(item)">有用</i>
                    <i class="iconfont icon-ali-thumb-down bad" :class="{'dark':item.isfeedback==='dark'}" @click="unuseful(item)">没用</i>
                  </div>
                </div>
              </div>
            </li>
            <!--选项卡-->
            <div class="prompts" v-if="item.prompts">
              <template v-for="pitem in item.prompts">
                <el-button class="prompts-button" type="info" :style="textStyleObj">
                  <div @click="sendRelate(pitem.text)">{{pitem.button}}</div>
                </el-button>
              </template>
            </div>
            <!--相似问法推荐-->
            <div class="relate" v-if="enable_relate&&item.log&&item.log.source&&item.log.source===1&&item.q_list_std&&item.q_list_std.length>0">
              <p>您是否还想问:</p>
              <ul>
                <li v-for="(reitem, reindex) in item.q_list_std" :key="reindex" @click="sendRelate(reitem)">
                  <template v-if="reitem">{{reindex+1}}、{{reitem}}</template>
                </li>
              </ul>
            </div>
          </template>
        </div>
        <!--butt-->
        <!-- <div class="butt">
          <span v-show="isBotWorking&&person===1" @click="transferCustome">转人工</span>
          <span v-show="!isBotWorking" @click="transferBot">转机器人</span>
        </div> -->
        <!--会话满意度评价-->
        <div class="evaluate" :class="{'show':isShutDown}">
          <span class="tip">感谢您的咨询，请对我们的服务做出评价</span>
          <div class="satisfaction satisfied">
            <i class="iconfont icon-ali-smile"></i>
            <p class="text" @click="isShutDown=false">满意</p>
          </div>
          <div class="satisfaction unsatisfied">
            <i class="iconfont icon-ali-sad"></i>
            <p class="text" @click="changeChatSatisfactionAndMini">不满意</p>
          </div>
        </div>
        <!--模态框-->
        <div :class="{'modal':isShutDown}"></div>
        <!--footer-->
        <div class="footer">
          <el-row type="flex" justify="space-around" align="middle">
            <el-col :span="19">
              <el-input v-show="isBotWorking" ref="input_focus" @focus="InputFocus" @blur="" v-model.trim="usay" @keyup.enter.native="sendUSay" class="textarea" type="input" maxlength="300" placeholder="请输入您想问的问题..."></el-input>
            </el-col>
            <el-col :span="5">
              <el-button v-show="isBotWorking" class="textarea-button-send" @click="sendUSay" type="primary" :style="textStyleObj">发送</el-button>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between" align="center">
            <el-col :span="20">
              <el-input v-show="!isBotWorking" @focus="InputFocus" v-model.trim="usay" @keyup.enter.native="sendUSayCustome" class="textarea" type="input" maxlength="300" placeholder="人工服务"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button v-show="!isBotWorking" class="textarea-button-send" @click="sendUSayCustome" type="primary" :style="textStyleObj">发送客服</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import xss from "xss";
import { urls, urlsWebSocketBot, urlsWebSocketIoCustome } from "../api/config";
axios.defaults.headers = {
  "X-Requested-With": "XMLHttpRequest",
  "Content-Type": "application/json; charset=utf-8"
};
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;
export default {
  name: "chatroom",
  data() {
    return {
      isMini: true,
      currentSessionId: "", //当前最新sessionId
      socket: "", //机器人websocket
      webChannelForm: {
        webChannelId: "",
        window_name: "X-Bot",
        window_color: "",
        window_logo: "",
        js_string: ""
      },
      usay: "",
      msgLists: [
        /*{
            msg: '',
            sid: '',
            isUseClick: false, //是否点击了有用没用
            q_list: [],
            q_list_std: [],
            log: {
                user_type: 1, //用户类型,0为访客，1为bot，2为座席
                msg_type: 0, //消息类型,0为文本，1为其他
                channel: 0, //渠道,0为API，1为web
                msg_time: '2018-06-25 16:00',
                ori_question: '',
                std_question: '',
                confidence: 0
            }
          }*/
      ],
      isShutDown: true, //是否关闭了对话
      isBotWorking: true, //切换人工与机器人， true为机器人
      customesocket: "", //人工websocket.io
      enable_relate: true,
      person: 0 //转人工开关 0禁用，1启用
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.getWebChannel();
      this.getBotPerson();
      this.showChat();
    });
  },
  computed: {
    textStyleObj: function() {
      return {
        backgroundColor: this.webChannelForm.window_color
      };
    }
  },
  watch: {
    "webChannelForm.window_name": {
      handler: function() {
        document.querySelector("title").innerText =
          this.webChannelForm.window_name || "X-Bot";
      },
      immediate: true
    }
  },
  methods: {
    InputFocus() {
      let cnt = 0;
      let timerId = setInterval(() => {
        if (cnt < 3) {
          cnt++;
        } else {
          clearInterval(timerId);
          timerId = null;
          return;
        }
        document.body.scrollTop = document.body.scrollHeight;
      }, 300);
    },
    getBotId() {
      // let ElementSrc = document.getElementById("unique-robot-script");
      let query = this.$route.query;
      let botId = "";
      if (Object.keys(query).length != 0) {
        // let src = ElementSrc.src;
        // botId = src.split("botid=")[1];
        botId = query.botid;
      } else {
        if (process.env.NODE_ENV === "development") {
          //默认一个机器人， 便于开发测试
          botId = "986b560ebb674f45b80273efd04dbad4"; /*  默认id  215*/
        } else {
          botId = "";
        }
      }
      return botId;
    },
    async getWebChannel() {
      let botId = await this.getBotId();
      let url =
        urls +
        'manage/bot_web_channel?q={"filters":[{"name":"bot_id","op":"eq","val":"' +
        botId +
        '"}]}';
      url = encodeURI(url);
      let Res = await axios.get(url);
      if (Res.status === 200) {
        this.webChannelForm = Res.data.objects[0];
      }
    },
    async getBotPerson() {
      let botId = this.getBotId();
      let url = urls + "api/anonymous";
      let params = { bot_id: botId };
      url = encodeURI(url);
      let Res = await axios.post(url, params);
      if (Res.data.code === 2000) {
        // console.log(Res.data);
        this.person = Res.data.person;
        this.enable_relate = Res.data.enable_relate;
      }
    },
    sendUSay() {
      this.$refs.input_focus.focus();
      if (this.socket.readyState === 3) {
        this.initBotWebSocket();
        setTimeout(() => {
          if (!this.usay) return;
          let xss_usay = filterXSS(this.usay);
          this.wssend(xss_usay);
        }, 500);
      } else {
        if (!this.usay) return;
        let xss_usay = filterXSS(this.usay);
        this.wssend(xss_usay);
      }
    },
    sendRelate(item) {
      let xss_item = item;
      this.wssend(filterXSS(xss_item));
    },
    guid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        let r = (Math.random() * 16) | 0;
        let v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    initBotWebSocket() {
      let botId = this.getBotId();
      //关闭debugmode模式
      let host =
        urlsWebSocketBot +
        "ws?sid=" +
        this.currentSessionId +
        "&botid=" +
        botId;
      this.socket = new WebSocket(host);
      this.socket.onopen = () => {
        this.wsopen();
      };
      this.socket.onmessage = msg => {
        this.wsmessage(msg);
      };
      this.socket.onclose = () => {
        this.shutDownChat();
      };
    },
    wsopen() {
      this.msgLists.push({ type: "tips", msg: "机器人上线了" });
      this.scrollContent();
    },
    wssend(agentData) {
      this.socket.send(agentData);
      let time = this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      this.msgLists.push({
        msg: agentData,
        log: {
          user_type: 0, //用户类型,0为访客，1为bot，2为座席
          msg_type: 0, //消息类型,0为文本，1为其他
          msg_time: time
        }
      });
      this.usay = "";
    },
    wsmessage(msg) {
      let data = JSON.parse(msg.data);
      let time = this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      data.log.msg_time = time;
      this.msgLists.push(data);
      this.scrollContent();
    },
    wsclose() {
      // this.msgLists = []
      this.socket.close();
      if (this.socket.readyState === 3) {
        this.msgLists.push({ type: "tips", msg: "机器人下线了" });
      }
      this.scrollContent();
    },
    //点击图片，显示聊天框
    showChat() {
      // this.isMini = false;
      if (this.isShutDown) {
        this.currentSessionId = this.guid();
        this.initBotWebSocket();
      }
      this.isShutDown = false;
    },
    //点击关闭按钮，关闭聊天框
    shutDownChat() {
      this.isShutDown = true;
      this.wsclose();
      if (this.customesocket) {
        this.customesocket.disconnect();
      }
      // this.isBotWorking = true;
    },
    //点击有用
    useful(item) {
      if (item.isfeedback) {
        return;
      }
      this.$set(item, "isfeedback", "green");
    },
    //点击没用
    unuseful(item) {
      let botId = this.getBotId();
      let params = {
        bot_id: botId,
        session_id: item.sid,
        ori_question: item.log.ori_question,
        question: item.log.std_question,
        confidence: item.log.confidence || 0,
        answer: item.msg,
        channel: item.log.channel,
        flag: 0
      };
      if (item.isfeedback) {
        return;
      }
      this.$set(item, "isfeedback", "dark");
      let url = urls.split("cms")[0] + "api/log_chat_useless";
      axios.post(url, params);
    },
    //转人工
    transferCustome() {
      this.isBotWorking = false;
      this.initCustomeWebSocket();
      this.changeChatSatisfaction();
    },
    //转机器人
    transferBot() {
      this.isBotWorking = true;
      this.customesocket.disconnect();
      this.initBotWebSocket();
    },
    initCustomeWebSocket() {
      let _this = this;
      let hostIO =
        urlsWebSocketIoCustome +
        "im/user?userid=3693242538&nickname=kevin&session=" +
        this.currentSessionId +
        "&appid=1kYI4k";
      // eslint-disable-next-line
      this.customesocket = io.connect(hostIO, { "force new connection": true });
      //监听连接
      this.customesocket.on("connect", function() {
        _this.msgLists.push({ type: "tips", msg: "人工客服上线了" });
        _this.scrollContent();
      });
      //监听消息
      this.customesocket.on("message", function(data) {
        //客户端接收的消息
        if (data.calltype === "out") {
          _this.msgLists.push({
            msg: data.message,
            log: {
              user_type: 2, //用户类型,0为访客，1为bot，2为座席
              msg_type: 0, //消息类型,0为文本，1为其他
              msg_time: data.createtime
            }
          });
          _this.scrollContent();
        }
      });
      //监听离线
      this.customesocket.on("disconnect", function() {
        _this.msgLists.push({ type: "tips", msg: "人工客服下线了" });
        _this.scrollContent();
      });
    },
    sendUSayCustome() {
      if (!this.usay) return;
      let jsonObject = {
        appid: "1kYI4k",
        userid: "3693242538",
        type: "message",
        nickname: "kevin",
        session: this.currentSessionId,
        message: this.usay
      };
      this.customesocket.emit("message", jsonObject);
      let time = this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      this.msgLists.push({
        msg: this.usay,
        log: {
          user_type: 0, //用户类型,0为访客，1为bot，2为座席
          msg_type: 0, //消息类型,0为文本，1为其他
          msg_time: time
        }
      });
      this.scrollContent();
      this.usay = "";
    },
    //记录不满意的会话 ，转人工也记录为不满意的会话，但不关闭窗口
    changeChatSatisfaction() {
      let params = {
        satisfaction: 3,
        q: {
          filters: [
            { name: "session_id", op: "eq", val: this.currentSessionId }
          ]
        }
      };
      let url = urls + "manage/log_session";
      axios.put(url, params);
    },
    //记录不满意的会话并关闭窗口
    changeChatSatisfactionAndMini() {
      this.isShutDown = false;
      this.isMini = false;
      this.changeChatSatisfaction();
    },
    //滚动
    scrollContent() {
      setTimeout(function() {
        const oTextarea = document.getElementById("chatContent");
        oTextarea.scrollTop = oTextarea.scrollHeight;
      }, 20);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/icon/iconfont.css";
// body {
//   overflow-x: hidden;
// }
.chatroom {
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar {
    width: 0px;
    // height: 6px;
    background-color: #f5f5f5;
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #fff;
  }
  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #aaa;
  }
  position: fixed;
  left: 50%;
  bottom: 50%;
  transform: translate(-50%, 50%);
  z-index: 2018;
  .working {
    // .robot-chat-pic {
    //   display: none;
    //   cursor: pointer;
    //   z-index: -1;
    //   &.active {
    //     display: inline-block;
    //     transform: translateY(60px);
    //     transition: 1s ease-in-out;
    //     z-index: 2010;
    //     border-radius: 50%;
    //     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    //   }
    // }
    .chat {
      // position: absolute;
      // /*right: 60px;*/
      // /*bottom: 30px;*/
      // right: 0;
      // bottom: -30px;
      // z-index: 2018;
      border: 0;
      // transition: all 0.5s ease-in-out;
      // &.mini {
      //   transform: translateY(600px);
      //   z-index: 2010;
      // }
    }
  }
  @media screen and (min-width: 769px) {
    .chat {
      max-width: 400px;
      max-height: 600px;
    }
  }
  .chat {
    width: 100vw;
    height: 100vh;
    border: 1px solid #fafafa;
    border-radius: 0;
    background-color: #fff;
    font-size: 14px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;

    /* header */
    .header {
      height: 56px;
      line-height: 56px;
      padding: 0 15px;
      background-color: #0084ff;
      color: #fff;
      letter-spacing: 1px;
      .chat-name {
        float: left;
        margin-left: 5px;
        font-family: "Microsoft YaHei";
        cursor: pointer;
      }
      .icons {
        display: inline-block;
        float: right;
        cursor: pointer;
        .icon {
          width: 16px;
          height: 16px;
          font-size: 16px;
          transition: 0.3s;
          &:hover {
            /*transform: scale(1.3);*/
          }
        }
        .el-icon-close {
          margin-left: 8px;
          &:hover {
            /*transform: rotate(180deg) scale(1.3);*/
          }
        }
      }
    }

    /* chatContent */
    .body {
      width: 100%;
      // height: 314px;
      flex-grow: 1;
      padding: 10px 8px;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch; /* 修复h5下滚动不流畅问题 */
      background-color: #ebebeb;
      box-sizing: border-box;
      .dialog {
        margin-bottom: 18px;
        clear: both;
        &:after {
          display: table;
          content: "";
          clear: both;
        }
        .time {
          color: #808080;
          font-size: 12px;
          margin-bottom: 5px;
        }
        .msg {
          .avatar {
            display: inline-block;
            float: left;
            width: 30px;
            height: 30px;
            margin-right: 10px;
            border-radius: 15px;
            vertical-align: middle;
          }
          .text {
            display: inline-block;
            float: left;
            max-width: 75%;
            min-height: 20px;
            line-height: 20px;
            padding: 10px;
            text-align: left;
            background-color: #fff;
            border-radius: 0 15px 15px 15px;
            word-wrap: break-word;
            word-break: break-all;
          }
          .feedback {
            position: relative;
            float: right;
            font-size: 12px;
            margin: 5px 0 0 20px;
            .iconfont {
              display: inline-block;
              width: 45px;
              height: 20px;
              line-height: 20px;
              color: #bfbfbf;
              font-size: 12px;
              text-align: center;
              border-radius: 2px;
              cursor: pointer;
            }
            .fine {
              position: relative;
              margin-right: 5px;
              &.green {
                color: #0084ff;
              }
              &:after {
                position: absolute;
                right: -5px;
                content: "|";
                color: #bfbfbf;
              }
            }
            .bad {
              &.dark {
                color: #666;
              }
            }
          }
        }
      }
      .dialog.user {
        .msg {
          .avatar {
            display: inline-block;
            float: right;
            width: 30px;
            height: 30px;
            margin-right: 10px;
            border-radius: 15px;
            vertical-align: middle;
          }
          .text {
            display: inline-block;
            float: right;
            margin-right: 10px;
            max-width: 75%;
            min-height: 20px;
            line-height: 20px;
            padding: 10px;
            color: #fff;
            text-align: left;
            background-color: #3db994;
            border-radius: 30px 0 30px 30px;
          }
        }
      }
      /*相似问法*/
      .relate {
        display: inline-block;
        float: left;
        max-width: 75%;
        width: 120px;
        min-height: 20px;
        line-height: 20px;
        padding: 10px;
        text-align: left;
        background-color: #fff;
        word-wrap: break-word;
        word-break: break-all;
        margin: -8px 0 10px 40px;
        font-size: 12px;
        clear: both;
        li {
          cursor: pointer;
          &:hover {
            /*font-size: 14px;*/
            font-weight: bold;
          }
        }
      }
    }

    /* butt */
    .butt {
      width: 100%;
      height: 32px;
      line-height: 32px;
      padding-right: 10px;
      color: #0084ff;
      font-size: 14px;
      text-align: right;
      background-color: #ffffff;
      border-top: 1px solid #ececec;
      box-sizing: border-box;
      span {
        cursor: pointer;
      }
    }

    /* footer */
    .footer {
      position: relative;
      width: 100%;
      padding: 10px 5px;
      box-sizing: border-box;
      background-color: #f5f5f5;
      border-top: 1px solid #dbdbdb;
      // height: 82px;
      // .textarea-button-send {
      //   width: auto;
      //   height: 30px;
      //   padding: 9px 12px;
      //   position: absolute;
      //   right: 10px;
      //   bottom: 10px;
      // }
    }

    /* evaluate */
    .evaluate {
      display: none;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 300px;
      height: 185px;
      margin: -80px 0 0 -150px;
      background-color: #fff;
      z-index: 10;
      border: 1px solid #ccc;
      &.show {
        display: block;
      }
      .tip {
        display: block;
        margin: 20px auto 50px;
        padding: 0 0 0 10px;
        text-align: left;
      }
      .satisfaction {
        display: inline-block;
        width: 120px;
        height: 60px;
        .iconfont {
          font-size: 50px;
          vertical-align: middle;
        }
        .text {
          display: inline-block;
          width: 60px;
          height: 36px;
          line-height: 36px;
          border: 1px solid #ccc;
          vertical-align: middle;
          cursor: pointer;
        }
        .icon-ali-smile {
          color: #fedc40;
          font-size: 43px;
          margin-right: 3px;
        }
        .icon-ali-sad {
          color: #51b7e1;
        }
      }
    }
    .modal {
      /*display: none;*/
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.3);
      transition: all 0.2s;
      z-index: 2;
    }
  }
  .mini {
    width: 46px;
    height: 46px;
    border-radius: 23px;
    z-index: -1;
  }
}
</style>

<style lang="scss">
.chatroom {
  .textarea {
    width: 100%;
    .el-textarea__inner {
      height: 82px;
      resize: none;
      border: 0;
    }
  }
  .textarea-button-send {
    border: 0;
    padding: 9px 15px;
  }
  .onoffline {
    width: 180px;
    height: 18px;
    line-height: 18px;
    color: #808080;
    font-size: 10px;
    font-family: "Microsoft YaHei";
    text-align: center;
    margin: 5px auto;
    clear: both;
    background-color: #fff;
    border-radius: 3px;
  }
  /*修改图片大小*/
  .dialog {
    .text {
      img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  /*选项卡*/
  .prompts {
    // padding: 0 20px;
    width: 250px;
    margin: -10px auto 14px;
    .prompts-button {
      width: 116px;
      white-space: normal;
      text-align: center;
      margin: 2px 1px;
      padding: 9px 0;
      font-size: 12px;
      border: 0;
      border-radius: 4px;
      background-color: #0084ff;
    }
  }
}
</style>
